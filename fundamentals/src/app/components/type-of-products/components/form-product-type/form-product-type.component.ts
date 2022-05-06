import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { ModalService } from 'src/app/shared/services/modal-service/modal.service';

@Component({
  selector: 'app-form-product-type',
  templateUrl: './form-product-type.component.html',
  styleUrls: ['./form-product-type.component.css']
})
export class FormProductTypeComponent {

  @Output() saveEmit = new EventEmitter<CategoryModel>();

  public form: FormGroup = this.fb.group({});

  constructor(
    private readonly fb: FormBuilder,
    private readonly modelService: ModalService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  onClickSave(): void {
    if (this.form.valid) {
      this.saveEmit.emit(this.form.value);
    } else {
      this.modelService.showModal('Invalid form', 'Check the form', 'Error');
    }
  }
}
