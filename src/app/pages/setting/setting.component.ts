import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventsService } from 'src/app/services/events.service';
import Swal from 'sweetalert2';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from 'src/app/services/api/settings.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { msgErrors } from 'src/app/services/msgErrors.service';
import { EventService } from 'src/app/services/api/event.service';
@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html'
})

export class SettingComponent implements OnInit {
	public data: any = {};
	public query: string = '';
	public breadcrumbs = [{ url: '/admin/inicio', title: 'Inicio' }, { url: '', title: 'SETTING' }];
	public inputValues: number[] = [];
	public form: any = {
		max_slider_categories: '',
		max_slider_home: '',
		max_slider_last: '',
		max_slider_similar: '',
		banner: '',
		bannerBase64: '',
		banner_link: '',
		slider_home: []
	};
	public tmp: any = {
		banner: ''
	};
	constructor(
		private _msgErrors: msgErrors,
		private spinner: NgxSpinnerService,
		public settings: SettingsService,
		public events: EventsService,
		public eventService: EventService,
		private _snackBar: MatSnackBar
	) {

	}


	ngOnInit(): void {
		this.getResult();
		this.events.subscribe('app-input-file', (data: any) => {
			this.form[data.inputName] = data.base64;
			this.tmp[data.inputNamePreview] = data.base64;
		});
	}
	ngOnDestroy() {
		this.events.destroy('app-input-file');
	}

	getResult() {
		this.spinner.show();
		this.settings.get().subscribe(
			(data: any) => {
				this.form = data.setting;
				this.tmp.banner = (data.setting.banner) ? data.setting.banner : "assets/images/default-background.jpg"	
			}
		);
		this.eventService.getHome().subscribe(
			(data: any) => {
				data.data.forEach((event: any) => {
					this.inputValues.push(event.order)
				});
				this.data = data;
			},
			(error) => this.spinner.hide(),
			() => this.spinner.hide()
		);
	}
	save(form: NgForm) {
		let sliderHome: any = [];
		this.inputValues.forEach((value, index) => {
			sliderHome.push({
				id: this.data.data[index].id,
				order: value
			});
		});
		this.form.slider_home = sliderHome;
		this.spinner.show();
		this.settings.save(this.form).subscribe(
			(data: any) => {
				this._snackBar.open('Los datos se guardaron correctamente', 'Aceptar', { duration: 3000 });
				location.reload()
			},
			(error) => this._msgErrors.show(error)
		);
	}

	removeBanner(defaultPicture: string) {
		this.form.bannerBase64 = '##delete##';
		this.tmp.banner = defaultPicture;
	}

}
