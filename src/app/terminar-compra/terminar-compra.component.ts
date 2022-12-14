
import { Component, OnInit } from '@angular/core';
import { CarritoService } from "../carrito.service";
import { DataSharingService } from "../data-sharing.service";
import { Cliente } from "../cliente";
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { summaryFileName } from '@angular/compiler/src/aot/util';


@Component({
  selector: 'app-terminar-compra',
  templateUrl: './terminar-compra.component.html',
  styleUrls: ['./terminar-compra.component.css']
})

export class TerminarCompraComponent implements OnInit {
  //  dezplegar ubicaciones 
  panelOpenState = false;

  constructor(private carritoService: CarritoService, private dataSharingService: DataSharingService
  ) {

  }

  public compraTerminada = false;
  public productos = [];
  public columnas = ['nombre', 'descripcion', 'precio', 'quitar'];
  public clienteModel = new Cliente("", "");

  public async revisarYTerminar(stepper) {
    if (!this.clienteModel.direccion) {
      return alert("Falta escribir la dirección del locker disponible");
    }
    if (!this.clienteModel.nombre) {
      return alert("Falta escribir el nombre del cliente");
    }
    const respuestaCompra = await this.carritoService.terminarCompra(this.clienteModel);
    console.log({ respuestaCompra })


    this.compraTerminada = true;
    stepper.next();
    this.dataSharingService.changeMessage("car_updated")
  }

  public total() {
    let total = 0;
    this.productos.forEach(p => total += p.precio);
    return total;
  }


  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  public async quitar(producto) {
    await this.carritoService.quitarProducto(producto.id);
    await this.obtenerProductos();
    // Comunicación entre componentes
    this.dataSharingService.changeMessage("car_updated");
  }

  public async obtenerProductos() {

    this.productos = await this.carritoService.obtenerProductos();
  }

  public irAPaso2() {

  }

  async ngOnInit() {
    await this.obtenerProductos();
  }

}