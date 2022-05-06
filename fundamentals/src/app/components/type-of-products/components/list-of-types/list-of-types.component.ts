import { Component, Input } from '@angular/core';
import { CategoryModel } from 'src/app/core/models/categories.model';

@Component({
  selector: 'app-list-of-types',
  templateUrl: './list-of-types.component.html',
  styleUrls: ['./list-of-types.component.css']
})
export class ListOfTypesComponent {
  captionText = 'List of types products';
  @Input() listOfCategories: CategoryModel[] = [];
}
