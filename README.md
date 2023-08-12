# matrix-calculator

## Description

This is a simple matrix calculator that can perform most matrix/vector operations. Data processing executes on the server, which is written in Python and uses Numpy for the matrix operations. So you can implement your own matrix operation quite easily (if you need it).

## Operations
```
1. Addition: add(A, B)
2. Subtraction: subtract(A, B)
3. Matrix Transposition: transpose(A)
4. Dot Product: dot(vA, vB)
5. Cross Product: cross(vA, vB)
6. Matrix Inversion: inverse(A)
7. Determinant Computation: det(A) 
```

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
# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
source server/venv/bin/activate

# Install numpy within the virtual environment
pip install numpy

# Run server.py
python server/server.py

# Deactivate the virtual environment
deactivate
```

### Compiles and minifies for production
```
npm run build
```
