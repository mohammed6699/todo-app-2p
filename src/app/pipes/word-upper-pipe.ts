import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordUpper',
})
export class WordUpperPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if(!value)return '';
    return value.split(' ').map(word => {
      if(word.length === 0) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
}
}