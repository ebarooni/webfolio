import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { BUILD_INFO } from '../../environments/build-info';
import { PageHeader } from '../shared/components/page-header/page-header';
import { BuildFacts } from './build-facts/build-facts';
import { Dependencies } from './dependencies/dependencies';

@Component({
  selector: 'app-build-info',
  imports: [BuildFacts, Dependencies, PageHeader, TranslocoDirective],
  templateUrl: './build-info.html',
})
export class BuildInfo {
  readonly dependencies = BUILD_INFO.dependencies;
  readonly devDependencies = BUILD_INFO.devDependencies;
}
