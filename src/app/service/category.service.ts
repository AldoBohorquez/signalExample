import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, effect, inject, signal } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private htpp = inject(HttpClient)

  private categoriasSginal = signal<Array<any>>([])

  constructor()
  {
    effect(()=>
    {
      this.getCategory()
    
    })
  }

  get categorias(): Signal <Array<any>|[]>
  {
    return computed(()=>this.categoriasSginal())
  }

  set categorias(valor: Array<any> | [])
  {
    this.categoriasSginal.update((s:Array<any>|[])=>valor)
  }

  getCategory()
  {
    this.htpp.get<Array<any>>('https://fakestoreapi.com/products/categories').pipe(
      catchError((err,c)=>
      {
        console.log(err);
        return []
      })
    ).subscribe(
      {
        next:(response)=>
        {
          this.categorias = response
        }
      }
    )
  }

}
