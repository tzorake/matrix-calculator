import { Matrix } from './Matrix';

export class MatrixStructure
{
    constructor(name = '', data = Matrix.empty, readonly = true)
    {
        this.name = name;
        this.data = data;
        this.readonly = readonly;
    }

    copy()
    {
        return new MatrixStructure(this.name, this.data.copy(), this.readonly);
    }

    static get empty()
    {
        return new MatrixStructure();
    }
}