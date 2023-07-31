from dataclasses import dataclass
from typing import Tuple
from matrix_structure import MatrixStructure

@dataclass
class UserData:
    collection: Tuple[MatrixStructure] = ()
    equations: str = ''