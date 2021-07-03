import { ValidatorFn, AbstractControl } from '@angular/forms';

export function datePickerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden = true;
    const currentYear = new Date().getFullYear();
    if (control.value) {
      const date: Date = control.value;
      if (date.getFullYear() < currentYear-17) {
        forbidden = false;
      }
    }
    return forbidden ? { 'invalidDOBYear': true } : null;
  };
} 