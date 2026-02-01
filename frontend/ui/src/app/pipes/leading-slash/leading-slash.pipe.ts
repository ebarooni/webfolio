import { Pipe, PipeTransform } from '@angular/core';
import { Route } from '../../config/constants/route';

@Pipe({
  name: 'leadingSlash',
})
export class LeadingSlashPipe implements PipeTransform {
  transform(route: Route): string {
    return `/${route}`;
  }
}
