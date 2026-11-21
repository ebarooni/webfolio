import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

/** The copy buttons of the install command and of the code samples. */
const en = {
  copyCode: 'Copy code',
  copy: 'Copy',
  copied: 'Copied',
  copiedAnnouncement: 'Copied to the clipboard.',
  copyFailed: 'Copy failed. Select the code and copy it by hand.',
  copyCommand: 'Copy install command',
  copiedCommand: 'Copied install command',
} as const;

type CodeCopy = CopyShape<typeof en>;

export const CODE_COPY: LocalizedCopy<CodeCopy> = {
  en,
  de: {
    copyCode: 'Code kopieren',
    copy: 'Kopieren',
    copied: 'Kopiert',
    copiedAnnouncement: 'In die Zwischenablage kopiert.',
    copyFailed:
      'Kopieren fehlgeschlagen. Markiere den Code und kopiere ihn von Hand.',
    copyCommand: 'Installationsbefehl kopieren',
    copiedCommand: 'Installationsbefehl kopiert',
  },
  nl: {
    copyCode: 'Code kopiëren',
    copy: 'Kopiëren',
    copied: 'Gekopieerd',
    copiedAnnouncement: 'Gekopieerd naar het klembord.',
    copyFailed: 'Kopiëren mislukt. Selecteer de code en kopieer die zelf.',
    copyCommand: 'Installatieopdracht kopiëren',
    copiedCommand: 'Installatieopdracht gekopieerd',
  },
};
