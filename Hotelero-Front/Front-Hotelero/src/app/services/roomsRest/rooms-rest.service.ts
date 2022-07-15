import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'aplication/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }

    getRooms(){
      return this.http.get(environment.baseUri + 'rooms/getRooms', {headers: this.httpOptions});
    }

    addRoom(id:String, params:{}){
      return this.http.post(environment.baseUri + 'rooms/saveRoom/' + id, params, {headers: this.httpOptions});
    }

    deleteRoom(id:String){
      return this.http.delete(environment.baseUri + 'rooms/deleteRoom/' + id, {headers: this.httpOptions});
    }

    updateRoom(id:String, params:{}){
      return this.http.put(environment.baseUri + 'rooms/udateRoom/' + id, params, {headers: this.httpOptions})
    }

    leaveRoom(id:String){
      return this.http.put(environment.baseUri + 'rooms/leaveRoom/' + id, {headers: this.httpOptions});
    }

    reserveRoom(id:String){
      return this.http.put(environment.baseUri + 'rooms/reserveRoom/' + id, {headers: this.httpOptions});
    }
}
