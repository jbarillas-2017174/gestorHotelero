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

  getRooms(id: String) {
    return this.http.get(environment.baseUri + 'room/getRooms/' + id, { headers: this.httpOptions });
  }

  getRoom(id: string){
    return this.http.get(environment.baseUri + 'room/getRoom/' +id, {headers: this.httpOptions});
  }

  saveRoom(id: String, params: {}) {
    return this.http.post(environment.baseUri + 'room/saveRoom/' + id, params, { headers: this.httpOptions });
  }

  deleteRoom(id: String) {
    return this.http.delete(environment.baseUri + 'room/deleteRoom/' + id, { headers: this.httpOptions });
  }

  updateRoom(id: String, params: {}) {
    return this.http.put(environment.baseUri + 'room/udateRoom/' + id, params, { headers: this.httpOptions })
  }

  leaveRoom(id: String) {
    return this.http.put(environment.baseUri + 'room/leaveRoom/' + id, { headers: this.httpOptions });
  }

  reserveRoom(id: String) {
    return this.http.put(environment.baseUri + 'room/reserveRoom/' + id, { headers: this.httpOptions });
  }
}
