import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { typesOfProducts } from '../../constants/types-of-products.constant';


@Injectable()
export class CategoryService {

  private readonly changes = new BehaviorSubject<boolean>(false);

  constructor() { }

  getAllProducts(): Observable<CategoryModel[]> {
    console.log('Executing method');

    return of(typesOfProducts).pipe(
      tap( () => {
        console.log('Executing query');

      })
    );
  }

  saveType(typesOfProduct: CategoryModel): Observable<CategoryModel> {
    console.log('Executing method');


    return of(typesOfProduct).pipe(
      tap( () => {
        typesOfProducts.push(typesOfProduct);
        console.log('Executing save...');
      })
    );
  }

  getChanges(): Observable<boolean> {
    return this.changes.asObservable().pipe(
      tap( () => {
        console.log('Executing change...');
      })
    );
  }

  setChanges(value: boolean): void {
    this.changes.next(value);
  }

}
