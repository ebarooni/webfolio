import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

const en = {
  eyebrow: 'How it works',
  titleLead: 'Set it up once.',
  titleTail: 'Then just browse.',
  steps: [
    {
      title: 'Choose Safari’s bookmarks file',
      body: 'macOS asks you to pick it once. The app and the extension share that access from then on.',
    },
    {
      title: 'Turn on the extension',
      body: 'Turn on Bookmark Status and allow it on all websites, so the toolbar button can see which page you’re on.',
    },
    {
      title: 'Browse as usual',
      body: 'The button updates as you switch tabs. Close the app window anytime. It keeps working in the background.',
    },
  ],
  fileHintBefore: 'In the file panel, press ',
  fileKeysLabel: 'Shift Command G',
  fileKeys: ['⇧', '⌘', 'G'],
  fileHintAfter: ' and paste ',
  filePath: '~/Library/Safari/Bookmarks.plist',
  crumb: 'Safari Settings › Extensions › Bookmark Status › All Websites: ',
  crumbStrong: 'Allow',
  notSaved: 'Not saved',
  saved: 'Saved',
} as const;

type StepsCopy = CopyShape<typeof en>;

export const stepsCopy: LocalizedCopy<StepsCopy> = {
  en,
  de: {
    eyebrow: 'So funktioniert es',
    titleLead: 'Einmal einrichten.',
    titleTail: 'Dann einfach surfen.',
    steps: [
      {
        title: 'Wähle die Lesezeichendatei von Safari',
        body: 'macOS bittet dich einmal, sie auszuwählen. Danach teilen sich die App und die Erweiterung diesen Zugriff.',
      },
      {
        title: 'Schalte die Erweiterung ein',
        body: 'Schalte Bookmark Status ein und erlaube es auf allen Websites, damit die Taste in der Symbolleiste sieht, auf welcher Seite du bist.',
      },
      {
        title: 'Surf wie gewohnt',
        body: 'Die Taste aktualisiert sich, wenn du den Tab wechselst. Du kannst das App-Fenster jederzeit schließen. Die App arbeitet im Hintergrund weiter.',
      },
    ],
    fileHintBefore: 'Drücke im Dateifenster ',
    fileKeysLabel: 'Umschalttaste Befehlstaste G',
    fileKeys: ['⇧', '⌘', 'G'],
    fileHintAfter: ' und füge ein: ',
    filePath: '~/Library/Safari/Bookmarks.plist',
    crumb:
      'Safari-Einstellungen › Erweiterungen › Bookmark Status › Alle Websites: ',
    crumbStrong: 'Erlauben',
    notSaved: 'Not saved',
    saved: 'Saved',
  },
  nl: {
    eyebrow: 'Zo werkt het',
    titleLead: 'Eén keer instellen.',
    titleTail: 'Daarna gewoon surfen.',
    steps: [
      {
        title: 'Kies het bladwijzerbestand van Safari',
        body: 'macOS vraagt je één keer om het te kiezen. Daarna delen de app en de extensie die toegang.',
      },
      {
        title: 'Zet de extensie aan',
        body: 'Zet Bookmark Status aan en sta hem toe op alle websites, zodat de knop in de knoppenbalk ziet op welke pagina je bent.',
      },
      {
        title: 'Surf zoals altijd',
        body: 'De knop werkt zich bij als je van tabblad wisselt. Sluit het app-venster wanneer je wilt. De app blijft op de achtergrond werken.',
      },
    ],
    fileHintBefore: 'Druk in het bestandsvenster op ',
    fileKeysLabel: 'Shift Command G',
    fileKeys: ['⇧', '⌘', 'G'],
    fileHintAfter: ' en plak ',
    filePath: '~/Library/Safari/Bookmarks.plist',
    crumb:
      'Safari-instellingen › Extensies › Bookmark Status › Alle websites: ',
    crumbStrong: 'Sta toe',
    notSaved: 'Not saved',
    saved: 'Saved',
  },
};
