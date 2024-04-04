import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-picture',
  templateUrl: './card-picture.component.html',
  styleUrls: ['./card-picture.component.css']
})
export class CardPictureComponent implements OnInit {
  @Input() path: string = "";
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() default: string = "";
  defaultPicture = 'assets/images/no-photo.png'
  constructor() { }
  
  ngOnInit(): void {
    if(this.default!=""){
      this.defaultPicture=this.default
    }
  }

}
