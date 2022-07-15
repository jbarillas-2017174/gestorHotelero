import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchHomePipe implements PipeTransform {

  transform(hotels:any, search:any ){
    if(search== undefined){
        return hotels;
    }else{

    }
    return hotels.filter( (pHotels:any) => {
        return pHotels.name.toLowerCase().includes(search.toLowerCase()) || pHotels.address.toLowerCase().includes(search.toLowerCase())
    })
  }
}
