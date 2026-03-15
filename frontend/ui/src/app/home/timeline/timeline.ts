import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Checkmark } from './checkmark/checkmark';

type TimelineItem = Readonly<{
  period: string;
  title: string;
  description: string;
  align: 'start' | 'end';
}>;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.html',
  imports: [Checkmark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block bg-base-200 px-4 py-20 sm:px-8',
  },
})
export class Timeline {
  readonly items: readonly TimelineItem[] = [
    {
      period: 'Q2 2021',
      title: 'Full Stack Software Engineer',
      description:
        'Started working as a Full Stack Software Engineer across frontend, backend, and DevOps in multiple web applications.',
      align: 'end',
    },
    {
      period: 'Q1 2021',
      title: 'B.Sc. Graduate',
      description: 'Completed studies in Industrial Engineering.',
      align: 'start',
    },
    {
      period: 'Q2 2020',
      title: 'AI and ML Intern',
      description:
        'Started internship and Bachelor thesis in Artificial Intelligence and Machine Learning, focusing on data driven solutions and model development.',
      align: 'end',
    },
    {
      period: 'Q4 2017',
      title: 'Student',
      description:
        'Began studies in Industrial Engineering with focus on Information Engineering.',
      align: 'start',
    },
  ];
}
