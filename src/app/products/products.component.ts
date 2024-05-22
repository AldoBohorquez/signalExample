import { Component, effect, inject } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Producto } from '../interfaces/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  private service = inject(ProductsService);

  productos = Array<Producto>()

  constructor() {

    effect(()=>
    {
      this.productos = this.service.Productos()
    })
  }

}
