import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultDir = [];
    for(const dir of value){
      if(dir.cliente.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultDir.push(dir)
      }else if(dir.cliente.correo.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultDir.push(dir)
      }
    }
    return resultDir;
  }

}
