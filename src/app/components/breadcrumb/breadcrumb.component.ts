import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input() title: string = '';
  @Input() breadcrumbs: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
