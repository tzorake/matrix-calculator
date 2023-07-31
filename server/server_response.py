from dataclasses import dataclass
from typing import Tuple
from matrix_structure import MatrixStructure

@dataclass
class ServerResponse:
    success: bool = True
    message: str = ''
    code: int = 200
    collection: Tuple[MatrixStructure] = ()