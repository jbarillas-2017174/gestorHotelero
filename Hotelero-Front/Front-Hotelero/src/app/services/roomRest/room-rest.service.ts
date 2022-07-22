import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class RoomRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })
  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }

  saveRoom(id: String, params: {}) {
    return this.http.post(environment.baseUri + 'room/saveRoom/' + id, params, { headers: this.httpOptions });
  }

  getRooms(id: String) {
    return this.http.get(environment.baseUri + 'room/getRooms/' + id, { headers: this.httpOptions })
  }

  getRoom(id: String) {
    return this.http.get(environment.baseUri + 'room/getRoom/' + id, { headers: this.httpOptions })
  }

  reserveRoom(id: String, params: {}) {
    return this.http.put(environment.baseUri + 'room/reserveRoom/' + id, params, { headers: this.httpOptions })
  }

  updateRoom(id: String, params: {}) {
    return this.http.put(environment.baseUri + 'room/updateRoom/' + id, params, { headers: this.httpOptions })
  }

  deleteRoom(id: String) {
    return this.http.delete(environment.baseUri + 'room/deleteRoom/' + id, { headers: this.httpOptions })
  }

  leaveRoom(id: String, params: {}) {
    return this.http.put(environment.baseUri + 'room/leaveRoom/' + id, params, { headers: this.httpOptions })
  }

  getServices(id: String) {
    return this.http.get(environment.baseUri + 'room/getService/' + id, { headers: this.httpOptions });
  }

}
