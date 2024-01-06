import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialsVisitor'
})
export class InitialsVisitorPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const firstLetter = value.split(' ')[0].charAt(0);
    return firstLetter;
  }

}
