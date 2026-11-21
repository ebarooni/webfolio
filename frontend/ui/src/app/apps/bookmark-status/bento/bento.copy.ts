import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

const en = {
  eyebrow: 'Features',
  titleLead: 'One small button.',
  titleTail: 'Your whole bookmark library.',
  lead: 'A Safari extension and a lightweight Mac app that read the bookmarks Safari already keeps.',
} as const;

type BentoCopy = CopyShape<typeof en>;

export const bentoCopy: LocalizedCopy<BentoCopy> = {
  en,
  de: {
    eyebrow: 'Funktionen',
    titleLead: 'Eine kleine Taste.',
    titleTail: 'Alle deine Lesezeichen.',
    lead: 'Eine Safari-Erweiterung und eine schlanke Mac-App, die die Lesezeichen lesen, die Safari ohnehin speichert.',
  },
  nl: {
    eyebrow: 'Functies',
    titleLead: 'Eén kleine knop.',
    titleTail: 'Al je bladwijzers.',
    lead: 'Een Safari-extensie en een lichte Mac-app die de bladwijzers lezen die Safari al bewaart.',
  },
};
