import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, effect, inject, signal } from '@angular/core';
import { Producto } from '../interfaces/product.interface';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private htpp = inject(HttpClient)

  private productosSignal = signal <Array<Producto>>([])

  constructor()
  {
    effect(()=>{
      this.getProducts()
    })
  }

  get Productos(): Signal<Array<Producto>|[]>
  {
    return computed(()=>this.productosSignal())
  }

  set Productos(value: Array<Producto>| [])
  {
    this.productosSignal.update((s:Producto[]|[])=>value)
  }

  getProducts()
  {
    this.htpp.get<Array<Producto>>('https://fakestoreapi.com/products').pipe(
      catchError((err,c)=>
      {
        console.log(err);
        return [];
      })
    ).subscribe({
      next:(response)=>
      {
        this.Productos = response
        
      }
    })
  }

}
