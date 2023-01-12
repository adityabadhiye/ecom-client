import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Options } from 'ngx-slider-v2';
import { CategoryService } from '../service/category.service';
import { ProductsService } from '../service/products.service';
import { CategoryRepository } from '../state/category.repository';
import { ProductsRepository } from '../state/products.repository';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  MAX_PRICE_SLIDER_LIMIT = 200_000;
  // params
  pageParam: number = 1;
  categoryParam: string | null = null;
  minParam: number = 0;
  maxParam: number = this.MAX_PRICE_SLIDER_LIMIT;
  searchParam: string | null = null;

  products$ = this.productsRepository.products$;
  pagination$ = this.productsRepository.pagination$;
  category$ = this.categoryRepository.category$;
  selectedCatId$ = this.categoryRepository.selectedCatId$;
  // ui values
  minValue: number = 0;
  maxValue: number = this.MAX_PRICE_SLIDER_LIMIT;
  searchText = "";

  constructor(
    private productsService: ProductsService,
    private productsRepository: ProductsRepository,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryRepository: CategoryRepository,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pageParam = +params['page'] ? +params['page'] : 1;
      this.categoryParam = params['category'];
      this.minParam = +params['min'] ? +params['min'] : 0;
      this.maxParam = +params['max'] ? +params['max'] : this.MAX_PRICE_SLIDER_LIMIT;
      this.searchParam = params['search'];

      this.minValue = this.minParam;
      this.maxValue = this.maxParam;
      this.categoryService.selectCategory(this.categoryParam || '');
      this.searchText = this.searchParam ? this.searchParam : "";
      this.productsService.fetchProducts(this.pageParam, this.categoryParam, this.minParam, this.maxParam, this.searchParam);
    });
    this.categoryService.fetchCategory();
  }

  pageChanged(page: number): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: page === 1 ? null : page,
      },
      queryParamsHandling: 'merge',
    });
  }

  categoryChanged(cat: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        category: cat === "" ? null : cat,
      },
      queryParamsHandling: 'merge',
    });
  }

  sliderChanged() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        min: this.minValue <= 0 ? null : this.minValue,
        max: this.maxValue >= this.MAX_PRICE_SLIDER_LIMIT ? null : this.maxValue
      },
      queryParamsHandling: 'merge',
    });
  }


  options: Options = {
    floor: 0,
    ceil: this.MAX_PRICE_SLIDER_LIMIT,
    translate: (value: number): string => {
      return '₹' + value;
    },
    step: 100
  };

  searchChanged() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        search: this.searchText === "" ? null : this.searchText,
      },
      queryParamsHandling: 'merge',
    });
  }
}
