import { Matrix } from "./Matrix";

export class MatrixStructure
{
    constructor(alias = "", data)
    {
        this.alias = alias;
        this.data = data ? data.copy() : new Matrix();
    }

    copy()
    {
        return new MatrixStructure(this.alias, this.data.copy());
    }
}