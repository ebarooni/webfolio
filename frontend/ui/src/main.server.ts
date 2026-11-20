import {
  BootstrapContext,
  bootstrapApplication,
} from '@angular/platform-browser';

import { App } from './app/app';
import { serverConfig } from './app/app.config.server';

// The build uses this entry only to prerender pages to static HTML.
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, serverConfig, context);

export default bootstrap;
