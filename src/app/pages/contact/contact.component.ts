import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  imports: [BaseLayoutComponent, HeroComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {}
