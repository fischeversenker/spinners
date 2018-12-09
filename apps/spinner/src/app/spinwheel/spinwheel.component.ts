import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlsService, IControl } from '../controls.service';
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

  private _getControlsValue(): string {
    return this.controls.map(control => `${control.var}: ${control.formControl.value}${control.unit}`).join(';');
  }

}
