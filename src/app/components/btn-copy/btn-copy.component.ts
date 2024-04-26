import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-btn-copy',
  templateUrl: './btn-copy.component.html',
  styleUrls: ['./btn-copy.component.css']
})
export class BtnCopyComponent {
  @Input() public text='';
  @Input() public icon=false;
  public defaultText='Copiar'
  public btnText='';
  constructor(private clipboard: Clipboard,private _snackBar: MatSnackBar){
    this.btnText=this.defaultText
  }

  copy() {
    this.clipboard.copy(this.text);
    this._snackBar.open('Copiado','', { duration: 1500 });
    // setTimeout(() => {
    //   this.btnText=this.defaultText
    // }, 1500);
  }
}
