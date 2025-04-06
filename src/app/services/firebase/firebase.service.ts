import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Functions,
  connectFunctionsEmulator,
  getFunctions,
} from 'firebase/functions';
import { Inject, Injectable } from '@angular/core';
import { IS_DEV_MODE } from '../../tokens/is-dev-mode';
import { environment } from '../../../environments/environment';

@Injectable()
export class FirebaseService {
  private _app?: FirebaseApp;

  constructor(@Inject(IS_DEV_MODE) private readonly isDevMode: boolean) {
    if (isDevMode) {
      this.emulateFunctions();
    }
  }

  get app(): FirebaseApp {
    if (!this._app) {
      return this.initializeApp();
    }
    return this._app;
  }

  get functions(): Functions {
    return getFunctions(this.app, 'europe-west1');
  }

  public initializeApp(): FirebaseApp {
    this._app = initializeApp(environment.firebaseConfig);
    return this._app;
  }

  private emulateFunctions(): void {
    connectFunctionsEmulator(this.functions, 'localhost', 5001);
  }
}
