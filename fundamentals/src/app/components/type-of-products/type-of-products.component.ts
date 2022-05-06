import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, mergeMap, Observable, tap, throwError } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { CategoryService } from 'src/app/shared/services/category-service/category.service';
import { ModalService } from 'src/app/shared/services/modal-service/modal.service';
import { message, title, typeMessage } from '../products-main/constant/message.constant';

@Component({
  selector: 'app-type-of-products',
  templateUrl: './type-of-products.component.html',
  styleUrls: ['./type-of-products.component.css']
})
export class TypeOfProductsComponent {

  listOfTypeProducts: CategoryModel[] = [];

  constructor(
    private readonly categoryService: CategoryService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.onSearchTypeProducts().subscribe();
  }

  onSavetType(product: CategoryModel): void {
    this.categoryService
      .saveType(product)
      .pipe(
        mergeMap(() => {
          // success
          this.modalService.showModal(
            title.save,
            message.saveSucces,
            typeMessage.succes
          );
          return this.onSearchTypeProducts();
        }),
        catchError((error: HttpErrorResponse) => {
          // error
          this.modalService.showModal(
            title.save,
            error.message,
            typeMessage.error
          );
          return throwError(error);
        })
      )
      .subscribe();
  }

  onSearchTypeProducts(): Observable<CategoryModel[]> {
    return this.categoryService.getAllProducts().pipe(
      tap((products: CategoryModel[]) => {
        this.listOfTypeProducts = [...products];
      }),
      // catchError((error: HttpErrorResponse) => {
      //   if (error.status === 400) {
      //     this.modalService.showModal(
      //       title.search,
      //       message.error400,
      //       typeMessage.error
      //     );
      //     // return throwError(error);
      //   }
      // })
    );
  }

}
