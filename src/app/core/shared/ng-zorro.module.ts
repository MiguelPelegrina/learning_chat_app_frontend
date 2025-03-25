import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  CheckOutline,
  ClockCircleOutline,
  PlusCircleFill,
} from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

export const icons: IconDefinition[] = [
  ClockCircleOutline,
  CheckOutline,
  PlusCircleFill,
];

@NgModule({
  imports: [NzButtonModule, NzIconModule],
  exports: [NzButtonModule, NzIconModule],
})
export class NgZorroModule {}
