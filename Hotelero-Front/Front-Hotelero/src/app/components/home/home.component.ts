import { Component, OnInit } from '@angular/core';
import { HomeRestService } from 'src/app/services/homeRest/home-rest.service';
import { ModelHotel } from 'src/app/models/hotel.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels:any
  VwHotels: ModelHotel
  hotelsUpdate: any


  constructor(
    private homeRest: HomeRestService
  ) { 
    this.VwHotels = new ModelHotel('','','','');
  }

  ngOnInit(): void {
    this.getHotelsView();
  }

  getHotelsView(){
    this.homeRest.getHotels().subscribe({
      next: (res:any) => this.hotels = res.hotels,
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  saveHotels(addHotelsForm:any){
      this.homeRest.addHotels(this.VwHotels).subscribe({
        next: (res:any)=> {
          this.getHotelsView();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1000
          }),
          addHotelsForm.reset();
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


  deleteFrontHotel(id:string){
    this.homeRest.deleteHotel(id).subscribe({
      next: (res:any)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        })
        this.getHotelsView();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      }),
    });
  }

  getViewHotel(id:string){
    this.homeRest.getHotel(id).subscribe({
      next: (res: any) => (this.hotelsUpdate = res.hotel),
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
  });
  }

  updateFrontHotel(){
    this.homeRest.updateHotel(this.hotelsUpdate._id, this.hotelsUpdate).subscribe({
      next:(res:any)=> {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1000
        })
        this.getHotelsView();
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






/*---------------------Mostrar-------------------------- 

  getHotelsView(){
    this.homeRest.getHotels().subscribe({
      next: (res:any)=> this.hotels = res.hotels,
      error: (err)=> alert(err.error.message)
    })
  }

----------------------Guardar-------------------------- 
  saveHotels(addHotelsForm:any){
    this.homeRest.addHotels(this.VwHotels).subscribe({
      next: (res:any)=> {
        alert(res.message)
        this.getHotelsView();
        addHotelsForm.reset();
      }, 
      error: (err)=> alert(err.error.message || err.error)
    })
  }

/* ---------------------Eliminar-------------------------- 
    deleteFrontHotel(id:string){
    this.homeRest.deleteHotel(id).subscribe({
      next: (res:any)=> {
        alert(res.message); 
        this.getHotelsView();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }
  
  -----------------MostrarHotalEspecifico------------------
    getViewHotel(id:string){
      this.homeRest.getHotel(id).subscribe({
        next:(res:any)=> this.hotelsUpdate = res.hotel,
        error: (err)=> alert(err.error.message)
      })
  }

  -------------------- Editar Hotel------------------------------
    updateFrontHotel(){
    this.homeRest.updateHotel(this.hotelsUpdate._id, this.hotelsUpdate).subscribe({
      next:(res:any)=> {
      alert(res.message);
      this.getHotelsView();
      },
      error: (err)=> alert(err.error.message || err.error)
    })    
  }
*/