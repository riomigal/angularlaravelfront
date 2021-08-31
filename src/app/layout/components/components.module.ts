import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './form/input/input.component';
import { SelectComponent } from './form/select/select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ImageComponent } from './form/image/image.component';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { AlertComponent } from './form/alert/alert.component';

@NgModule({
  declarations: [
    SelectComponent,
    InputComponent,
    ImageComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule,
  ],
  exports: [SelectComponent, InputComponent, ImageComponent, AlertComponent],
})
export class ComponentsModule {}
