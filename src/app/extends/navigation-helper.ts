import { Route } from '../constants/route';
import { Theme } from 'daisyui';
import { themesArray } from '../constants/themes-array';

export class NavigationHelper {
  get themes(): Theme[] {
    return themesArray;
  }

  get Route(): typeof Route {
    return Route;
  }
}
