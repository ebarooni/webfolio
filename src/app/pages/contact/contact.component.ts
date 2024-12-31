import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { HeroComponent } from './hero/hero.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  imports: [BaseLayoutComponent, HeroComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {}
