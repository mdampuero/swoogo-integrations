export class Event {
    public id: string;
    public name: string;
    public pictureBackground: string;
    public pictureCard: string;
    public description!: string;
    public category: any;
    public duration: string;
    public isActive: number;
    public inHome: number;
    public inSwoogo: number;
    public start_date: string;
    public start_time: string;
    public end_date: string;
    public end_time: string;
    public url: string;
    public eventSwoogo: any;
    constructor(fields?: any) {
        this.id = fields.id;
        this.name = fields.name;
        this.pictureBackground = fields.pictureBackground;
        this.pictureCard = fields.pictureCard;
        this.description = fields.description;
        this.category = fields.category;
        this.duration = fields.duration;
        this.isActive = fields.isActive;
        this.inHome = fields.inHome;
        this.inSwoogo = fields.inSwoogo;
        this.start_date = fields.start_date;
        this.start_time = fields.start_time;
        this.end_date = fields.end_date;
        this.end_time = fields.end_time;
        this.url = fields.url;
        this.eventSwoogo = fields.eventSwoogo;
    }
}
