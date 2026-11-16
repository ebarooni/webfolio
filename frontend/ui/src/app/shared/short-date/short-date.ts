import { Pipe, PipeTransform } from '@angular/core';

// The short month name reads better than digits in every language.
@Pipe({ name: 'shortDate' })
export class ShortDate implements PipeTransform {
  transform(date: Date, language: string): string {
    return new Intl.DateTimeFormat(language, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
}
