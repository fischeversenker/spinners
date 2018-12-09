import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlsService, IControl } from '../../controls.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'sp-spinwheel',
  templateUrl: './spinwheel.component.html',
  styleUrls: ['./spinwheel.component.scss']
})
export class SpinwheelComponent implements OnInit {

  spinwheelForm: FormGroup;
  controls$: Observable<IControl>;
  controls: IControl[];

  @HostBinding('attr.style')
  get settingsAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(this._getControlsValue());
  }

  constructor(
    private sanitizer: DomSanitizer,
    private controlsService: ControlsService,
  ) {

    this.controls = [];
    this.controls$ = this.controlsService.getControls();
    this.spinwheelForm = new FormGroup({});

    this.controlsService.getControls().pipe(
      tap(control => this.spinwheelForm.addControl(control.id, control.formControl)),
      tap(control => this.controls.push(control)),
    ).subscribe();
  }

  ngOnInit() {
  }

  // returns string of css vars
  // each control can specifiy a transformer to transform the raw input value
  // before plugging it into the css.
  // if not specified the css value will be `formControl.value + unit` (eg. '95px').
  private _getControlsValue(): any {
    const controlStrings = [];
    this.controls.forEach((control) => {
      if (!control.formControl) {
        return;
      }
      const defaultTransformer = (c) => `${c.formControl.value}${c.unit}`;
      const valueTransformer: (any) => string = control.transformer || defaultTransformer;
      controlStrings.push(`${control.var}: ${valueTransformer(control)}`);
    });

    return controlStrings.join('; ');
  }

}
