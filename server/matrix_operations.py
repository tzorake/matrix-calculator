import numpy as np

def add(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    return np.add(a, b)

def subtract(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    return np.subtract(a, b)

def transpose(a: np.ndarray) -> np.ndarray:
    return np.transpose(a)

def dot(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    return np.dot(a, b)

def cross(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    return np.cross(a, b)

def inverse(a: np.ndarray) -> np.ndarray:
    return np.linalg.inv(a)

def det(a: np.ndarray) -> np.ndarray:
    return np.array([[np.linalg.det(a)]])