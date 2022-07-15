import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHome'
})
export class SearchHomePipe implements PipeTransform {

  transform(hotels:any, searchHome:any){;
    if(searchHome == undefined){
        return hotels;
    }else{
      
    }
    return hotels.filter( (pHotels:any) => {
        return pHotels.name.toLowerCase().includes(searchHome.toLowerCase())
    })
  }
}
