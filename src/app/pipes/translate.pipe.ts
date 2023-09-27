import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

    // transform(value: string, args: any[]): any {
    //     const language = {
    //         "MERCADOPAGO": "Mercado Pago"
    //     } 
    //     return language[value];
    // }
}
