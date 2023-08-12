import * as math from 'mathjs';
import { Matrix } from '../Matrix.js';

export class MatrixOperations
{
  static add(a, b)
  {
    const data = math.add(
      math.reshape(a.values, [a.rows, a.columns]),
      math.reshape(b.values, [b.rows, b.columns])
    );

    return new Matrix(
      data.flat(), 
      ...math.size(data)
    );
  }

  static subtract(a, b)
  {
    const data = math.subtract(
      math.reshape(a.values, [a.rows, a.columns]),
      math.reshape(b.values, [b.rows, b.columns])
    );

    return new Matrix(
      data.flat(), 
      ...math.size(data)
    );
  }

  static transpose(m)
  {
    const data = math.transpose(
      math.reshape(m.values, [m.rows, m.columns])
    );


    return new Matrix(
      data.flat(), 
      ...math.size(data)
    );
  }

  static dot(a, b)
  {
    const data = math.multiply(
      math.reshape(a.values, [a.rows, a.columns]),
      math.reshape(b.values, [b.rows, b.columns])
    );

    return new Matrix(
      typeof data === 'number' ? [data] : data.flat(), 
      ...math.size(data)
    );
  }

  static cross(a, b)
  {
    const data = math.cross(
      math.reshape(a.values, [a.rows, a.columns]),
      math.reshape(b.values, [b.rows, b.columns])
    );

    return new Matrix(
      data.flat(), 
      ...math.size(data)
    );
  }

  static inverse(m) 
  {
    const data = math.inv(
      math.reshape(m.values, [m.rows, m.columns])
    );

    return new Matrix(
      data.flat(), 
      ...math.size(data)
    );
  }

  static det(m) 
  {
    const data = math.det(
      math.reshape(m.values, [m.rows, m.columns])
    );

    return new Matrix(
      [data], 
      1, 1
    );
  }
}