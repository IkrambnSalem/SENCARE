import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilterUser'
})
export class MyfilterUserPipe implements PipeTransform {

 // obj c tous le tabelau et le term c le obj quand va le chercher 
 transform(objs:any, term:any){
  if (term === undefined) {
    return objs;
    }
    return objs.filter((obj)=> {
    return (obj.firstName.toLowerCase().includes(term.toLowerCase()) 
    || obj.lastName.toLowerCase().includes(term.toLowerCase()) ||
    obj.phoneNumber.toString().includes(term.toLowerCase()));
    
    })
}
}
