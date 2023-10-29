# matrix-calculator

## Description

This is web-based matrix calculator written in Vue. It allows users to perform various matrix operations, such as addition, subtraction, multiplication, transposition, inversion, determinant computation, and more. This calculator provides a seamless and dynamic user experience, enabling users to input matrix data, select operations, and obtain results instantly within their web browser. It simplifies complex mathematical tasks involving matrices and serves as a valuable resource for students and engineers working with linear algebra and related fields.

## Operations

| Operation                                 | Description                                                                 |
|-------------------------------------------|-----------------------------------------------------------------------------|
| Addition                                  | Combining matrices or vectors element-wise                                  |
| Subtraction                               | Finding the difference between matrices or vectors element-wise             |
| Matrix Transposition                      | Flipping rows and columns along the main diagonal                           |
| Dot Product (Vector)                      | Computing the sum of the products of corresponding elements in two vectors  |
| Cross Product (Vector)                    | Calculating a vector orthogonal to two inputs with area-related magnitude   |
| Matrix Inversion                          | Inverting a square matrix for solving linear systems and more               |
| Determinant Computation                   | Calculating a scalar property for matrix-related computations               |

## Demo

https://github.com/tzorake/matrix-calculator/assets/9623983/6d86b401-8e7b-4fbd-9c5f-834b357cb737

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Setups and runs server for development
```console

$ python3 -m venv venv # Create a virtual environment

$ source server/venv/bin/activate # Activate the virtual environment

$ pip install numpy # Install numpy within the virtual environment

$ python server/server.py # Run server.py

$ deactivate # Deactivate the virtual environment
```

### Compiles and minifies for production
```
npm run build
```
