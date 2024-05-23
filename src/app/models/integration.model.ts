export class Integration {
    public id: string;
    public access_token: string;
    public event_id: string;
    public type: string;
    public password: string;
    public item_currency: string;
    public description!: string;
    public extraOption: number;
    public isActive: number;
    public event: any;
    constructor(fields?: any) {
        this.id = fields.id;
        this.access_token = fields.access_token;
        this.description = fields.description;
        this.event_id = fields.event_id;
        this.type = fields.type;
        this.password = fields.password;
        this.item_currency = fields.item_currency;
        this.extraOption = fields.extraOption;
        this.isActive = fields.isActive;
        this.event = fields.event;
    }
}
