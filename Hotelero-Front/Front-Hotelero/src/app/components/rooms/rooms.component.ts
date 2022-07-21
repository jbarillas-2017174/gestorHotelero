import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomModel } from 'src/app/models/room.model';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  room: RoomModel
  idHotel: any
  rooms: any
  newRoom: any
  roomUpdate: any

  constructor(
    private roomRest: RoomRestService,
    public activatedRoute: ActivatedRoute
  ) {
    this.room = new RoomModel('', 0, '', true, 0, '', '', [])
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((id: any) => {
      this.idHotel = id.get('id');
    })
    this.getRooms()
  }

  saveRoom(addRoom: any) {
    this.roomRest.saveRoom(this.idHotel, this.room).subscribe({
      next: (res: any) => {
        this.getRooms();
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        })
        addRoom.reset();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: err.error.message || err.error,
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  getRooms() {
    this.roomRest.getRooms(this.idHotel).subscribe({
      next: (res: any) => this.rooms = res.room,
      error: (err) => Swal.fire({
        icon: 'error',
        title: err.error.message || err.error,
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  getRoom(id: String) {
    this.roomRest.getRoom(id).subscribe({
      next: (res: any) => {
        this.roomUpdate = res.room
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: err.error.message || err.error,
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  reserveRoom(id: String) {
    this.roomRest.reserveRoom(id, '').subscribe({
      next: (res: any) => {
        this.getRooms();
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        })
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: err.error.message || err.error,
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  leaveRoom(id: String) {
    this.roomRest.leaveRoom(id, '').subscribe({
      next: (res: any) => {
        this.getRooms();
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        })
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: err.error.message || err.error,
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  updateRoom() {
    this.roomRest.updateRoom(this.roomUpdate._id, this.roomUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        });
        this.getRooms();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  deleteRoom(id: String) {
    this.roomRest.deleteRoom(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        });
        this.getRooms();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }


}
