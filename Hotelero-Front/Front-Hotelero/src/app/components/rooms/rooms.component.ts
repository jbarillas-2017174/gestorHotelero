import { Component, OnInit } from '@angular/core';
import { RoomsRestService } from 'src/app/services/roomsRest/rooms-rest.service';
import { ModelRooms } from 'src/app/models/rooms.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  idHotel: any
  rooms: ModelRooms
  roomsHotel: any
  roomsUpdate: any

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

  getRoom(id:string){
    this.roomRest.getRoom(id).subscribe({
      next: (res: any) => (this.roomsUpdate = res.rooms),
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
  });
  }

  saveRoom(addRoomForm: any){
    this.roomRest.saveRoom(this.idHotel, this.rooms).subscribe({
      next: (res:any) => {
        console
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res,
          showConfirmButton: false,
          timer: 1000
        });
        this.getRooms();
        addRoomForm.reset();
      },
      error: (err) => console.log(err.error, this.rooms)
    })
  }

  deleteRoom(id: String){
    this.roomRest.deleteRoom(id).subscribe({
      next: (res: any)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        });
        this.getRooms();
      },
      error: (err)=>Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  updateRooms(){
    this.roomRest.updateRoom(this.roomsUpdate._id, this.roomsUpdate).subscribe({
      next: (res:any)=>{
        Swal.fire({
          icon:'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        });
        this.getRooms();
      },
      error: (err)=> Swal.fire({
        icon:'error',
        title: 'Oops...',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

}

