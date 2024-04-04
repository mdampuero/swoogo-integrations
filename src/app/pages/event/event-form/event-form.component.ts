import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/services/api/event.service';
import { msgErrors } from 'src/app/services/msgErrors.service';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/api/category.service';
import { forkJoin } from 'rxjs';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EventSwoogoService } from 'src/app/services/api/eventSwoogo.service';
import { EventsService } from 'src/app/services/events.service';


export const MY_DATE_FORMATS = {
	parse: {
		dateInput: 'DD/MM/YYYY',
	},
	display: {
		dateInput: 'DD/MM/YYYY',
		monthYearLabel: 'MMMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY'
	},
};

@Component({
	selector: 'app-event-form',
	templateUrl: './event-form.component.html',
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
		{
			provide: MAT_DATE_FORMATS,
			useValue: {
				parse: {
					dateInput: 'DD/MM/YYYY',
				},
				display: {
					dateInput: 'DD/MM/YYYY',
					monthYearLabel: 'MMMM YYYY',
					dateA11yLabel: 'LL',
					monthYearA11yLabel: 'MMMM YYYY',
				},
			},
		},
	]
})
export class EventFormComponent implements OnInit {
	public datePickerStart: any;
	public datePickerEnd: any;
	public useMap: boolean = true;
	public dataReady: boolean = false;
	public form: any = {
		id: '',
		name: '',
		pictureBackground: '',
		pictureBackgroundBase64: '',
		pictureCard: '',
		pictureCardBase64: '',
		description: '',
		category: '',
		duration: '',
		isActive: 0,
		inHome: 1,
		order: 0,
		inSwoogo: 0,
		start_date: '',
		start_time: '',
		end_date: '',
		end_time: '',
		url: '',
		eventSwoogo: '',
		lat: '',
		lmg: '',
		zoom: ''
	};

	public tmp: any = {
		pictureBackground: '',
		pictureCard: ''
	};

	public categories: any;
	public eventsSwoogo: any;
	public titlePage: string = 'Nuevo';

	public breadcrumbs = [
		{ url: '/admin/inicio', title: 'Inicio' },
		{ url: '/admin/events', title: 'Eventos' },
		{ url: '', title: 'Nuevo' }
	];

	constructor(
		public events: EventsService,
		private _msgErrors: msgErrors,
		private spinner: NgxSpinnerService,
		private router: Router,
		private _snackBar: MatSnackBar,
		private activatedRoute: ActivatedRoute,
		public eventService: EventService,
		public categoryService: CategoryService,
		public eventSwoogoService: EventSwoogoService,
	) {
		let id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.loadForm(id);
			this.breadcrumbs[(this.breadcrumbs.length - 1)].title = 'Editar';
			this.titlePage = 'Editar';
		} else {
			this.loadForm('');
		}
	}

	loadForm(id: any) {
		this.spinner.show();
		if (id) {
			forkJoin({
				category: this.categoryService.getAll(),
				event: this.eventService.getOne(id),
				swoogo: this.eventSwoogoService.getAll(),
			}).subscribe({
				next: (data: any) => {
					this.form = data.event.event;
					this.categories = data.category.data;
					this.eventsSwoogo = data.swoogo.data;
					this.form.category = data.event.event.category._id
					this.form.isActive = (data.event.event.isActive) ? 1 : 0
					this.form.inHome = (data.event.event.inHome) ? 1 : 0
					this.form.inSwoogo = (data.event.event.inSwoogo) ? 1 : 0
					this.form.eventSwoogo = (data.event.event.inSwoogo) ? data.event.event.eventSwoogo : ''
					this.datePickerStart = (data.event.event.start_date) ? new Date(data.event.event.start_date) : ""
					this.datePickerEnd = (data.event.event.end_date) ? new Date(data.event.event.end_date) : ""
					this.tmp.pictureBackground = (data.event.event.pictureBackground) ? data.event.event.pictureBackground : "assets/images/default-background.jpg"
					this.tmp.pictureCard = (data.event.event.pictureCard) ? data.event.event.pictureCard : "assets/images/default-card.jpg"
					this.dataReady = true;
				},
				complete: () => this.spinner.hide()
			});
		} else {
			forkJoin({
				category: this.categoryService.getAll(),
				swoogo: this.eventSwoogoService.getAll(),
			}).subscribe({
				next: (data: any) => {
					this.categories = data.category.data;
					this.eventsSwoogo = data.swoogo.data;
					this.dataReady = true;
				},
				complete: () => this.spinner.hide()
			});
		}
	}

	ngOnInit(): void {
		this.events.subscribe('app-input-file', (data: any) => {
			this.form[data.inputName] = data.base64;
			this.tmp[data.inputNamePreview] = data.base64;
		});
		this.events.subscribe('mapbox', (data: any) => {
			this.form.lat = data.lat;
			this.form.lng = data.lng;
			this.form.zoom = data.zoom;
		});
	}
	ngOnDestroy() {
		this.events.destroy('app-input-file');
		this.events.destroy('mapbox');
	}

	save(form: NgForm) {
		if (this.datePickerStart) {
			const dateObjectStart = new Date(this.datePickerStart.getFullYear() + '-' + (parseInt(this.datePickerStart.getMonth()) + 1) + '-' + this.datePickerStart.getDate());
			const timeObjectStart = new Date(`1970-01-01T${this.form.start_time}`);
			this.form.start_date = new Date(dateObjectStart.getFullYear(), dateObjectStart.getMonth(), dateObjectStart.getDate(), timeObjectStart.getHours(), timeObjectStart.getMinutes(), timeObjectStart.getSeconds());
		}
		if (this.datePickerEnd) {
			const dateObjectEnd = new Date(this.datePickerEnd.getFullYear() + '-' + (parseInt(this.datePickerEnd.getMonth()) + 1) + '-' + this.datePickerEnd.getDate());
			const timeObjectEnd = new Date(`1970-01-01T${this.form.end_time}`);
			this.form.end_date = new Date(dateObjectEnd.getFullYear(), dateObjectEnd.getMonth(), dateObjectEnd.getDate(), timeObjectEnd.getHours(), timeObjectEnd.getMinutes(), timeObjectEnd.getSeconds());
		}

		this.spinner.show();
		this.eventService.save(this.form).subscribe(
			(data: any) => {
				this._snackBar.open('Registro creado', 'Aceptar', { duration: 3000 });
				this.router.navigate(['/admin/events']);
			},
			(error) => this._msgErrors.show(error)
		);
	}

	removePictureBackground(defaultPicture: string) {
		this.form.pictureBackgroundBase64 = '##delete##';
		this.tmp.pictureBackground = defaultPicture;
	}

	removePictureCard(defaultPicture: string) {
		this.form.pictureCardBase64 = '##delete##';
		this.tmp.pictureCard = defaultPicture;
	}
	resetMap() {
		this.form.lat = '';
		this.form.lng = '';
		this.form.zoom = '';
	}
	onSelectEvent() {
		let selectedEvent = this.eventsSwoogo.find((e: { id: string; }) => e.id == this.form.eventSwoogo);
		this.form.name = selectedEvent.name;
		if (selectedEvent.url)
			this.form.url = selectedEvent.domain + '/' + selectedEvent.url;
		if (selectedEvent.start_date)
			this.datePickerStart = new Date(selectedEvent.start_date);
		if (selectedEvent.start_time)
			this.form.start_time = selectedEvent.start_time;
		if (selectedEvent.end_date)
			this.datePickerEnd = new Date(selectedEvent.end_date);
		if (selectedEvent.end_time)
			this.form.end_time = selectedEvent.end_time;
	}
}
