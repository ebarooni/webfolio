import { Route, Routes } from '@angular/router';

import { routes } from '../app/app.routes';
import { Language } from '../app/config/languages';

/** The page routes of one language, as the app shell holds them. */
export function pageRoutesOf(language: Language): Routes {
  const shell = routes.find((route) => route.path === '');
  const languageRoute: Route | undefined = shell?.children?.find(
    (route) => route.path === (language === 'en' ? '' : language),
  );

  return languageRoute?.children ?? [];
}
