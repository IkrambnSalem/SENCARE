import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {

  // obj c tous le tabelau et le term c le obj quand va le chercher 
  transform(objs:any, term:any){
    if (term === undefined) {
      return objs;
      }
      return objs.filter((obj)=> {
      return (obj.assistantName.toLowerCase().includes(term.toLowerCase()) 
      || obj.assistantEmail.toLowerCase().includes(term.toLowerCase()) ||
      obj.assistantphone.toString().includes(term.toLowerCase()));
      
      })
  }

}
