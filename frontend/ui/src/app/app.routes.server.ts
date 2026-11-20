import { RenderMode, ServerRoute } from '@angular/ssr';

import { Route } from './config/route';

/*
 * Only pages that search engines must read without JavaScript are
 * prerendered. All other routes stay client-rendered, because they read
 * the visitor's stored theme, language and time zone on start.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: Route.PLUGINS_CAPACITOR_CALENDAR,
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
