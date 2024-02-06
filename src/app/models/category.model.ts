export class Category {
    public id: string;
    public name: string;
    public inHome: number;
    constructor(fields?: any) {
        this.id=fields.id;
        this.name=fields.name;
        this.inHome = fields.inHome;
    }
}
