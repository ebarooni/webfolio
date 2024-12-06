import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CompactNavbarComponent } from '../../components/compact-navbar/compact-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-base-layout',
  imports: [NavbarComponent, CompactNavbarComponent, FooterComponent],
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent {}
