import { Component, OnInit } from '@angular/core';
import { HomeRestService } from 'src/app/services/homeRest/home-rest.service';
import { ModelHotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels:any
  VwHotels: ModelHotel

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
      next: (res:any)=> this.hotels = res.hotels,
      error: (err)=> alert(err.error.message)
    })
  }

  saveHotels(saveForm:any){
    this.homeRest.addHotels(this.VwHotels).subscribe({
      next: (res:any)=> {
        alert(res.message)
        this.getHotelsView();
      }, 
      error: (err)=> alert(err.error.message || err.error)
    })
  }

}

