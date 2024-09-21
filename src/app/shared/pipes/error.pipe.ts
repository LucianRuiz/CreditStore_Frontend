import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { errorTranslate } from '../transform/error.translate';

@Pipe({
  name: 'error',
  standalone: true
})
export class ErrorPipe implements PipeTransform {

  transform(error: string, params: ValidationErrors): string {
    return errorTranslate[error]?.(params) ?? error;
  }

}
