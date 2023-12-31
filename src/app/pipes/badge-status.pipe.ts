import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badgeStatus'
})
export class BadgeStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value){
      case 'approved':
        return '<span class="badge badge-pill badge-success">Aprobado</span>';
      case 'pending':
        return '<span class="badge badge-pill badge-warning">Pendiente</span>';
      default:
        return '<span class="badge badge-pill badge-danger">Pendiente</span>';
    }
  }

}
