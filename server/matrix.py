from dataclasses import dataclass
from static_property import staticproperty
import numpy as np

@dataclass
class Matrix:
	values: tuple = ()
	rows: int = 0
	columns: int = 0

	@staticproperty
	def empty():
		return Matrix()
	
	def to_numpy(self):
		return np.array(self.values).reshape((self.rows, self.columns))
	
	@staticmethod
	def from_numpy(array: np.ndarray):
		return Matrix(tuple(array.reshape(-1).tolist()), array.shape[0], array.shape[1])