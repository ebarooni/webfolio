import { FirebaseApp, initializeApp } from 'firebase/app';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class FirebaseService {
  private _app?: FirebaseApp;

  get app(): FirebaseApp {
    if (!this._app) {
      return this.initializeApp();
    }
    return this._app;
  }

  public initializeApp(): FirebaseApp {
    this._app = initializeApp(environment.firebaseConfig);
    return this._app;
  }
}
