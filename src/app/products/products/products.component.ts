import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { ProductsRepository } from '../state/products.repository';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$ = this.productsRepository.products$;

  constructor(
    private productsService: ProductsService,
    private productsRepository: ProductsRepository
  ) { }

  ngOnInit(): void {
    this.productsService.fetchProducts();
  }
}
