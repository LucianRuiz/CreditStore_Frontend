import { ValidationErrors } from "@angular/forms";

export interface Translate {
  [key: string]: (errors: ValidationErrors) => string;
}

export const errorTranslate: Translate = {
  required: (_)=> 'El campo es obligatorio',
  email: (_)=> 'Debe ser un email válido',
  minlength: (errors) => `Debe tener al menos ${errors['requiredLength']} caracteres`,
  maxlength: (errors) => `Debe tener como máximo ${errors['requiredLength']} caracteres`,
  atLeastOneUppercase: (_)=> 'Debe tener al menos una mayúscula',
  atLeastOneLowercase: (_)=> 'Debe tener al menos una minúscula',
  atLeastOneNumber: (_)=> 'Debe tener al menos un número',
  atLeastOneSpecial: (_)=> 'Debe tener al menos un carácter especial',
  mustBeEqual: (_)=> 'Las contraseñas no coinciden',
};
