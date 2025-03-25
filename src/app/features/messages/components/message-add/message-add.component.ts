import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NgZorroModule } from '../../../../core/shared/ng-zorro.module';
import { SharedModule } from '../../../../core/shared/shared.module';

@Component({
  selector: 'app-message-add',
  imports: [SharedModule, NgZorroModule],
  templateUrl: './message-add.component.html',
  styleUrl: './message-add.component.scss',
})
export class MessageAddComponent {
  // Subcomponent
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  // Fields
  @Output() messageEmitter: EventEmitter<string> = new EventEmitter<string>();

  protected emitMessage(): void {
    const text = this.textarea.nativeElement.value;
    if (text.trim().length > 0) {
      this.messageEmitter.emit(text);
      this.textarea.nativeElement.value = '';
    }
  }
}
