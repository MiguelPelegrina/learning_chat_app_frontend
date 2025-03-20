import { Component, EventEmitter, Output } from '@angular/core';
import { NgZorroModule } from '../../../../core/shared/ng-zorro.module';
import { SharedModule } from '../../../../core/shared/shared.module';

@Component({
  selector: 'app-message-add',
  imports: [SharedModule, NgZorroModule],
  templateUrl: './message-add.component.html',
  styleUrl: './message-add.component.scss'
})
export class MessageAddComponent {
  // Fields
  @Output() messageEmitter: EventEmitter<string> = new EventEmitter<string>();

  protected inputValue = '';

  protected emitMessage(): void {
    this.messageEmitter.emit(this.inputValue);
    this.inputValue = '';
  }
}
