import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { Component } from '@angular/core';

@Component({
  imports: [BaseLayoutComponent],
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
})
export class AccessDeniedComponent {}
