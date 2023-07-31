from dataclasses import dataclass
from matrix import Matrix
from static_property import staticproperty

@dataclass
class MatrixStructure:
	name: str = ''
	data: Matrix = Matrix.empty

	@staticproperty
	def empty():
		return MatrixStructure()