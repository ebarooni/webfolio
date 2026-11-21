import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

const en = {
  title: 'Your bookmarks never leave your Mac.',
  lead: 'Bookmark Status works entirely on this Mac. No account, no cloud, nothing sent to anyone.',
  points: [
    {
      title: 'Read-only, always',
      body: 'It reads Safari’s bookmarks file and never writes to it. macOS only gives it read access.',
    },
    {
      title: 'No network, no analytics',
      body: 'No servers, trackers or analytics. Nothing in the app or the extension sends your data anywhere.',
    },
    {
      title: 'Only the page address',
      body: 'The extension compares the current tab’s address with your bookmarks. It never reads page content.',
    },
    {
      title: 'Stored on this Mac',
      body: 'For speed, the extension keeps a list of your bookmark URLs in its local storage. It isn’t encrypted, and it never leaves this Mac.',
    },
  ],
} as const;

type PrivacyCopy = CopyShape<typeof en>;

export const privacyCopy: LocalizedCopy<PrivacyCopy> = {
  en,
  de: {
    title: 'Deine Lesezeichen verlassen nie deinen Mac.',
    lead: 'Bookmark Status arbeitet vollständig auf diesem Mac. Kein Konto, keine Cloud, nichts wird an irgendwen gesendet.',
    points: [
      {
        title: 'Immer nur lesend',
        body: 'Es liest die Lesezeichendatei von Safari und schreibt nie hinein. macOS gibt ihm nur Lesezugriff.',
      },
      {
        title: 'Kein Netzwerk, keine Analyse',
        body: 'Keine Server, Tracker oder Analysen. Weder die App noch die Erweiterung senden deine Daten irgendwohin.',
      },
      {
        title: 'Nur die Adresse der Seite',
        body: 'Die Erweiterung vergleicht die Adresse des aktuellen Tabs mit deinen Lesezeichen. Den Inhalt der Seite liest sie nie.',
      },
      {
        title: 'Gespeichert auf diesem Mac',
        body: 'Damit es schnell geht, hält die Erweiterung eine Liste deiner Lesezeichen-URLs in ihrem lokalen Speicher. Sie ist nicht verschlüsselt und verlässt diesen Mac nie.',
      },
    ],
  },
  nl: {
    title: 'Je bladwijzers verlaten nooit je Mac.',
    lead: 'Bookmark Status werkt volledig op deze Mac. Geen account, geen cloud, er wordt niets naar iemand verstuurd.',
    points: [
      {
        title: 'Altijd alleen-lezen',
        body: 'Hij leest het bladwijzerbestand van Safari en schrijft er nooit naar. macOS geeft hem alleen leestoegang.',
      },
      {
        title: 'Geen netwerk, geen analytics',
        body: 'Geen servers, trackers of analytics. Niets in de app of de extensie verstuurt je gegevens.',
      },
      {
        title: 'Alleen het adres van de pagina',
        body: 'De extensie vergelijkt het adres van het huidige tabblad met je bladwijzers. De inhoud van de pagina leest hij nooit.',
      },
      {
        title: 'Bewaard op deze Mac',
        body: 'Voor de snelheid bewaart de extensie een lijst met de URL’s van je bladwijzers in haar lokale opslag. Die is niet versleuteld en verlaat deze Mac nooit.',
      },
    ],
  },
};
