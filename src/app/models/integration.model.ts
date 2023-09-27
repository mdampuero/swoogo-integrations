export class Integration {
    public id: string;
    public access_token: string;
    public event_id: string;
    public type: string;
    public item_title: string;
    public item_currency: string;
    public description!: string;
    public item_price: number;
    public isActive: number;
    public event: any;
    constructor(fields?: any) {
        this.id = fields.id;
        this.access_token = fields.access_token;
        this.description = fields.description;
        this.event_id = fields.event_id;
        this.type = fields.type;
        this.item_title = fields.item_title;
        this.item_currency = fields.item_currency;
        this.item_price = fields.item_price;
        this.isActive = fields.isActive;
        this.event = fields.event;
    }
}
