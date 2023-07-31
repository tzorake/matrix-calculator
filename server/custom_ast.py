import ast
from typing import Tuple
from matrix import Matrix
from matrix_structure import MatrixStructure
from server_response import ServerResponse
from matrix_operations import add, subtract, transpose, dot, cross, inverse, det
import numpy as np

node_classes = set([
    ast.Module,
    ast.Name,
    ast.Store,
    ast.Load,
    ast.Call,
    ast.Expr,
    ast.Assign,
])

class AST(ast.NodeVisitor):
    def __init__(self):
        ...

    def visit(self, node):
        if (node.__class__ not in node_classes):
            raise Exception('Unknown sequence is passed!')

        self.generic_visit(node)

def execute(equations: str, collection: Tuple[MatrixStructure]):
    # throws exception
    node = ast.parse(equations)
    AST().visit(node)

    names = tuple(map(lambda item: item.name, collection))
    data = tuple(map(lambda item: item.data, collection))

    _locals = dict(zip(names, data))
    _locals['add'] = add
    _locals['subtract'] = subtract
    _locals['transpose'] = transpose
    _locals['dot'] = dot
    _locals['cross'] = cross
    _locals['inverse'] = inverse
    _locals['det'] = det

    def split(expression: str):
        return tuple(map(lambda x: x.strip(), [expression[:expression.index('=')], expression[expression.index('=') + 1:]])) if '=' in expression else ('', expression)

    def pack(lhs, rhs):
        return MatrixStructure(lhs, Matrix.from_numpy(rhs))

    result = tuple(map(lambda x: pack(*x), 
        map(lambda x: (x[0], eval(x[1], _locals)), 
            map(lambda expsession: split(expsession), 
                [x for x in equations.split('\n') if x])    
    )))

    return result