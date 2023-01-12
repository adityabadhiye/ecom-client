import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailRoutes } from './product-detail.routes';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from '../auth/service/auth-guard.service';


@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductDetailRoutes),
    FormsModule
  ],
  providers: [AuthGuardService]
})
export class ProductDetailModule { }
