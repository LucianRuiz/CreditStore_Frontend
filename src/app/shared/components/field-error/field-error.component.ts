import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ErrorPipe } from '../../pipes/error.pipe';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: '[app-field-error]',
  standalone: true,
  imports: [KeyValuePipe, ErrorPipe, JsonPipe],
  templateUrl: './field-error.component.html',
  styleUrl: './field-error.component.css'
})
export class FieldErrorComponent implements OnInit {
  private _formGroupDirective = inject(FormGroupDirective, { optional: true, skipSelf: true });
  @Input({ required: true }) controlName!: string;
  @Input() message?: string;
  formControl?: AbstractControl | null;
  ngOnInit(): void {
    if (this._formGroupDirective) {
      this.formControl = this._formGroupDirective.form.get(this.controlName);
    }
  }
}
