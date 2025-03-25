import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Message } from '../../../../../graphql/generated/graphql';
import { MessageStatusPipe } from '../../../../core/pipes/message-status.pipe';
import { MaterialModule } from '../../../../core/shared/material.module';
import { NgZorroModule } from '../../../../core/shared/ng-zorro.module';
import { SharedModule } from '../../../../core/shared/shared.module';

@Component({
  selector: 'app-message-list',
  imports: [MaterialModule, MessageStatusPipe, NgZorroModule, SharedModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss',
})
export class MessageListComponent {
  @Input() messages: Message[] = [];

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
