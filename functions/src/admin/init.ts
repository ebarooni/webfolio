import { App, initializeApp } from 'firebase-admin/app';

class Init {
  private app?: App;

  public initApp(): App {
    if (!this.app) {
      this.app = initializeApp();
    }
    return this.app;
  }
}

const init = new Init();

export default init;
