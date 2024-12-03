import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Theme } from 'daisyui';

interface IState {
  theme: Theme;
}

@Injectable()
export class AppStore extends ComponentStore<IState> {
  constructor() {
    super({
      theme: 'light',
    });
  }
}
