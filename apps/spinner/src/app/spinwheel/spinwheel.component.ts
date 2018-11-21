import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sp-spinwheel',
  templateUrl: './spinwheel.component.pug',
  styleUrls: ['./spinwheel.component.scss']
})
export class SpinwheelComponent implements OnInit {

  public size = 50;
  public border = 20;

  constructor() { }

  ngOnInit() {
  }

  onSizeInput(newSize: string) {
    this.size = Math.floor(Number(newSize));
    (document.querySelector('.spinner-outer') as HTMLElement).style.setProperty('--spinner-size', `${this.size}px`);

    this.onBorderInput(this.size * 0.2);
  }

  onBorderInput(newBorder: string | number) {
    this.border = Math.floor(Number(newBorder));
    (document.querySelector('.spinner-outer') as HTMLElement).style.setProperty('--border-width', `${this.border}px`);
  }
}
