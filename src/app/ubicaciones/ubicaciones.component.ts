import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit {

  title = ' OFICINAS DE NIU-LOCKER';
  lat = 51.678418;
  lng = 7.809007;

  tap:number=0;
  constructor() { }




  
  ngOnInit(): void {
  }

}
