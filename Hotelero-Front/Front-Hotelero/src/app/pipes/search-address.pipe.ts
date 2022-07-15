import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAddress'
})
export class SearchAddressPipe implements PipeTransform {

  transform(hotels:any, search:any ){
    if(search == undefined){
       return hotels; 
    }else{
    }
    return hotels.filter( (pHotels:any) => {
      return pHotels.address.toLowerCase().includes(search.toLowerCase())
     })
  }
}
