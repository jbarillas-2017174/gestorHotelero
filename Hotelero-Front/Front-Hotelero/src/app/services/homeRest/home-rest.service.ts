import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';


@Injectable({
  providedIn: 'root'
})
export class HomeRestService {
    httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userRest.getToken()
    })

  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }


  getHotels(){
    return this.http.get(environment.baseUri + 'hotel/getHotels', {headers: this.httpOptions});
  }


  addHotels(params:{}){
    return this.http.post(environment.baseUri + 'hotel/addHotel', params, {headers: this.httpOptions});
  }

  /* Parte Editar un hotel*/
  getHotel(id: string){
    return this.http.get(environment.baseUri + 'hotel/getHotel/' +id, {headers: this.httpOptions});
  }

  updateHotel(id:string, params:{}){
    return this.http.put(environment.baseUri + 'hotel/updateHotel/' + id, params, {headers: this.httpOptions});
  }

  deleteHotel(id:string){
    return this.http.delete(environment.baseUri + 'hotel/deleteHotel/' + id, {headers: this.httpOptions});
  }
}
