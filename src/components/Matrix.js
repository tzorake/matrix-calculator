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
}