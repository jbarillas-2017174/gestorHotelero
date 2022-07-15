import { Component, OnInit } from '@angular/core';
import { RoomsRestService } from 'src/app/services/roomsRest/rooms-rest.service';
import { ModelRooms } from 'src/app/models/rooms.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  idHotel: any
  rooms: ModelRooms
  roomsHotel: any


  constructor(public activatedRoute: ActivatedRoute,
    private roomRest: RoomsRestService) {
    this.rooms = new ModelRooms('', 0, '', true, 0, '', '')
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((id: any) => {
      this.idHotel = id.get('id');
    })
    this.getRooms();
  }

  getRooms() {
    this.roomRest.getRooms(this.idHotel).subscribe({
      next: (res: any) => this.roomsHotel = res.room,
      error: (err) => alert(err.error.message || err.error)
    })
  }


}

