import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWord'
})
export class TruncateWordPipe implements PipeTransform {

  transform(inputString: string, maxLength: number): string {
    if (inputString.length > maxLength) {
      return inputString.substring(0, maxLength) + '..';
    }
    return inputString;
  }

}
