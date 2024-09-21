import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumericInput]',
  standalone: true
})
export class NumericInputDirective {
  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    if (this.ngControl && this.ngControl.control) {
      const targetElement = event.target as HTMLInputElement;
      const inputValue = targetElement.value;
      const numericValue = inputValue.replace(/\D/g, '');
      this.ngControl.control.setValue(numericValue);
    }
  }

  constructor(private ngControl: NgControl) { }
}
