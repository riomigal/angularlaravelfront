import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() errors: string[];
  @Input() label: string;
  @Input() control: FormControl | any;
  @Input() type: string = 'text';
  @Input() id: string = '';

  constructor() {}

  ngOnInit(): void {}
}
