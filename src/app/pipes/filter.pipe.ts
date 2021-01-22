import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultDir = [];
    for(const dir of value){
      if(dir.usuario.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultDir.push(dir)
      }else if(dir.usuario.email.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultDir.push(dir)
      }else if(dir.usuario.curp.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultDir.push(dir)
      }
    }
    return resultDir;
  }

}
