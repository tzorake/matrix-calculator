import { parseScript } from 'esprima';
import { walk } from 'esprima-walk'
import Sandbox from '@nyariv/sandboxjs';
import { ServerlessResponse } from './ServerlessResponse.js';
import { MatrixOperations } from './MatrixOperations.js';
import { MatrixStructure } from '../MatrixStructure.js';

function lines(equations) {
  return equations.split('\n').filter(item => item);
}

class Equation {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }
}

function split(equation) {

  if (equation.includes('=')) {
    const index = equation.indexOf('=');
    const [lhs, rhs] = [equation.slice(0, index).trim(), equation.slice(index + 1).trim()];

    return new Equation(lhs, rhs);
  }
  else {
    const [lhs, rhs] = ['', equation.trim()];

    return new Equation(lhs, rhs);
  }

}

const types = [
  'Program', 'ExpressionStatement', 'AssignmentExpression', 'Identifier', 'CallExpression'
]

function isValid(tree) {
  let valid = true;

  walk(tree, node => {
    if (!types.includes(node.type)) {
      valid = false;
    }
  });

  return valid;
}

function evaluate(mapping, equation) {
  const tree = parseScript(equation.rhs)
  if (!isValid(tree)) {
    throw Error('Invalid equation');
  }

  const sandbox = new Sandbox({ globals: {...Sandbox.SAFE_GLOBALS} });
  const exec = sandbox.compile(`return ${equation.rhs}`);

  const result = new MatrixStructure(
    equation.lhs, 
    exec(mapping).run()
  )

  return result;
}

const extension = new Map([
  ['add',       MatrixOperations.add],
  ['subtract',  MatrixOperations.subtract],
  ['transpose', MatrixOperations.transpose],
  ['dot',       MatrixOperations.dot],
  ['cross',     MatrixOperations.cross],
  ['inverse',   MatrixOperations.inverse],
  ['det',       MatrixOperations.det],
]);

function execute(collection, equations) {
  const mapping = new Map(collection.map(item => [item.name, item.data.copy()]));
  const extendedMapping = Object.fromEntries(
    new Map([...mapping, ...extension])
  );
  
  let result;
  let response;

  try {
    result = lines(equations)
      .map(equation => split(equation))
      .map(equation => evaluate(extendedMapping, equation));
    response = new ServerlessResponse({
      collection: result,
    });
  }
  catch (error) {
    result = [];
    response = new ServerlessResponse({
      success: false,
      collection: result,
      message: error.message,
      code: 500,
    });
  }

  return response;
}

export function solve(userData) {
  const collection = userData.collection;
  const equations = userData.equations;

  const response = execute(collection, equations);

  return response;
}

