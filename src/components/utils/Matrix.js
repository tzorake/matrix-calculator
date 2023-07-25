// The idea was to create immutable matrix and work with it.
// But Proxy Objects can not access private properties and it breaks the concept.
// Be aware of accident object field changing, debugging of the problem is hard, so...

export class Matrix
{
    constructor(values = [], rows = 0, columns = 0)
    {
        this.values = values;
        this.rows = rows;
        this.columns = columns;
    }

    copy()
    {
        return new Matrix(this.values.slice(), this.rows, this.columns);
    }

    static get empty()
    {
        return new Matrix();
    }

    toString()
    {
        const values = this.values;
        const rows = this.rows;
        const columns = this.columns;
    
        const range = [...Array(rows).keys()];
        const matrixRows = range.map(index => values.slice(columns*index, columns*(index + 1)));

        return matrixRows.map(item => item.join(' ')).join('\n');
    }

    static fromString(string)
    {
        const matrixRows = string.trim().split('\n').filter(row => row);
        if (!Array.isArray(matrixRows)) {
            return Matrix.empty;
        }
    
        const rawValues = matrixRows.map(row => row.replace(/ +/g, ' ').split(' '));
        if (rawValues.length === 0) {
            return Matrix.empty;
        }
        const rows = rawValues.length;
        const columns = rawValues[0].length;
        if (!rawValues.every(row => row.length === columns)) {
            return Matrix.empty;
        }

        const values = rawValues.flat().map(value => Number(value));
        if (rows*columns !== values.length) {
            return Matrix.empty;
        }
    
        return new Matrix(values, rows, columns);
    }
}