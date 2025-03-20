import { NgModule } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon'

import { PlusCircleFill } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

export const icons: IconDefinition[] = [PlusCircleFill];

@NgModule({
  imports: [NzButtonModule, NzIconModule],
  exports: [NzButtonModule, NzIconModule]
})
export class NgZorroModule {}
