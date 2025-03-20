import { Component, Input } from '@angular/core';
import { Message } from '../../../../../graphql/generated/graphql';
import { SharedModule } from '../../../../core/shared/shared.module';

@Component({
  selector: 'app-message-list',
  imports: [SharedModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  @Input() messages: Message[] = []
}
