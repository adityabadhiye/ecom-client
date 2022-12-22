import { Component, Input } from '@angular/core';
import { ProductResponce } from 'src/app/shared/product-resp.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() product?: ProductResponce;
}
