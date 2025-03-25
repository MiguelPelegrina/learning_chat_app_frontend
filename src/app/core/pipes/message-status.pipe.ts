import { Pipe, PipeTransform } from '@angular/core';
import { MessageStatus } from '../../../graphql/generated/graphql';

@Pipe({
  name: 'messageStatus',
})
export class MessageStatusPipe implements PipeTransform {
  transform(status: MessageStatus): string {
    switch (status) {
      case MessageStatus.NotSent:
        return 'clock-circle';
      case MessageStatus.Sent:
        return 'check';
      case MessageStatus.Received:
        return 'check';
      default:
        return 'clock-circle';
    }
  }
}
