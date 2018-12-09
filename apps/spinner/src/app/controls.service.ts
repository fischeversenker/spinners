import { Injectable } from '@angular/core';

import defaultControls from './mocks/controls';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

export interface IControl {
  id: string;
  label: string;
  var: string;
  value?: number | string | boolean;
  default: number | string | boolean;
  min?: number;
  max?: number;
  type?: string;
  unit: string;
  formControl?: FormControl;
  checkboxValues?: { checked: string, unchecked: string },
  transformer?: (any) => string;
}

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  constructor() { }

  getControls(): Observable<IControl> {
    return from(defaultControls)
      .pipe(
        map((control) => {

          const validators = [];
          if (control.min !== null && typeof control.min !== 'undefined') {
            validators.push(Validators.min(control.min));
          }
          if (control.max !== null && typeof control.max !== 'undefined') {
            validators.push(Validators.max(control.max));
          }

          return {
            ...control,
            formControl: new FormControl(control.default, validators),
          };
        }),
      );
  }
}
