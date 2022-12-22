import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { jquery } from 'src/app/shared/jquery';
import { ProductDetailService } from '../service/product-detail.service';
import { ProductDetailRepository } from '../state/product-detail.repository';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail$ = this.productDetailRepository.productDetail$;
  productId: string | null = null;

  constructor(
    private productDetailService: ProductDetailService,
    private productDetailRepository: ProductDetailRepository,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    jquery();
    this.productDetail$.subscribe(console.log);
    this.productId = this.route.snapshot.paramMap.get('productId');
    if (this.productId)
      this.productDetailService.fetchProductDetail(this.productId);
  }
}
