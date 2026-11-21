import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

const en = {
  title: 'Know what you’ve saved.',
  lead: 'One glance at the toolbar, and you’ll know whether you already saved this page.',
  label: 'Get it on the Mac App Store',
} as const;

type CallToActionCopy = CopyShape<typeof en>;

export const callToActionCopy: LocalizedCopy<CallToActionCopy> = {
  en,
  de: {
    title: 'Wisse, was du schon gespeichert hast.',
    lead: 'Ein Blick auf die Symbolleiste, und du weißt, ob du diese Seite schon gespeichert hast.',
    label: 'Im Mac App Store laden',
  },
  nl: {
    title: 'Weet wat je hebt bewaard.',
    lead: 'Eén blik op de knoppenbalk en je weet of je deze pagina al hebt bewaard.',
    label: 'Download in de Mac App Store',
  },
};
