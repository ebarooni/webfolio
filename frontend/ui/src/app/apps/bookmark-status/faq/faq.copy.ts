import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

const en = {
  eyebrow: 'FAQ',
  title: 'Questions, answered.',
  addBefore:
    'So Bookmark Status only reads Safari’s bookmarks file and never writes to it. To add or tidy bookmarks, use Safari’s own Add Bookmark (',
  addBetween: ') and bookmarks editor (',
  addAfter: ').',
  addKeysLabel: 'Command D',
  addKeys: ['⌘', 'D'],
  editorKeysLabel: 'Option Command B',
  editorKeys: ['⌥', '⌘', 'B'],
  matchBefore:
    'Matching is exact: a different path or query counts as a different page. The part after ',
  matchAfter:
    ' and one trailing slash are ignored. Only web (http and https) bookmarks count; Reading List and History don’t. When the exact page isn’t saved, the tooltip tells you how many pages from that site are, and one click shows them.',
  items: [
    {
      question: 'Can Bookmark Status add or remove bookmarks?',
      open: true,
      kind: 'add',
      paragraphs: [
        'No, and that’s on purpose. Apple’s Mac App Store rules (App Review Guideline 2.4.5) only let apps change another app’s data, like bookmarks, through macOS APIs made for it. Safari doesn’t offer one for bookmarks.',
      ],
    },
    {
      question: 'What do I need to use it?',
      open: false,
      kind: 'plain',
      paragraphs: [
        'A Mac with macOS Ventura 13 or later and Safari 16.4 or later. During setup you pick Safari’s bookmarks file once and turn on the extension with All Websites set to Allow.',
      ],
    },
    {
      question: 'Why does it need access to all websites?',
      open: false,
      kind: 'plain',
      paragraphs: [
        'So the toolbar button can see the address of the page you’re on and check it against your bookmarks. It doesn’t add scripts to websites or read what’s on the page.',
      ],
    },
    {
      question:
        'Why does a page show “Not saved” when I bookmarked a similar link?',
      open: false,
      kind: 'match',
      paragraphs: [],
    },
    {
      question: 'Does it work with Safari profiles?',
      open: false,
      kind: 'plain',
      paragraphs: [
        'Bookmark Status follows one bookmarks file at a time and uses it in every Safari profile. To follow another profile’s bookmarks, choose that profile’s bookmarks file instead with Choose a Different File… in the app.',
      ],
    },
    {
      question: 'What happens when I close the window?',
      open: false,
      kind: 'plain',
      paragraphs: [
        'The app leaves the Dock but keeps running, so the toolbar button keeps working. Use the bookmark icon in the menu bar to reopen the window, open the bookmark tree, or quit.',
      ],
    },
    {
      question: 'How much does it cost?',
      open: false,
      kind: 'plain',
      paragraphs: [
        'PRICE_TBD. Pricing will be confirmed on the Mac App Store at launch.',
      ],
    },
  ],
} as const;

type FaqCopy = CopyShape<typeof en>;

export const faqCopy: LocalizedCopy<FaqCopy> = {
  en,
  de: {
    eyebrow: 'FAQ',
    title: 'Fragen und Antworten.',
    addBefore:
      'Deshalb liest Bookmark Status die Lesezeichendatei von Safari nur und schreibt nie hinein. Zum Hinzufügen oder Aufräumen nutzt du die Safari-eigenen Funktionen „Lesezeichen hinzufügen“ (',
    addBetween: ') und den Lesezeichen-Editor (',
    addAfter: ').',
    addKeysLabel: 'Befehlstaste D',
    addKeys: ['⌘', 'D'],
    editorKeysLabel: 'Wahltaste Befehlstaste B',
    editorKeys: ['⌥', '⌘', 'B'],
    matchBefore:
      'Der Abgleich ist exakt: Ein anderer Pfad oder eine andere Query zählt als andere Seite. Der Teil nach ',
    matchAfter:
      ' und ein Schrägstrich am Ende werden ignoriert. Es zählen nur Web-Lesezeichen (http und https), nicht die Leseliste und nicht der Verlauf. Ist genau diese Seite nicht gespeichert, zeigt der Hinweis, wie viele Seiten dieser Website gespeichert sind, und ein Klick zeigt sie dir.',
    items: [
      {
        question: 'Kann Bookmark Status Lesezeichen hinzufügen oder entfernen?',
        open: true,
        kind: 'add',
        paragraphs: [
          'Nein, und das ist Absicht. Die Regeln des Mac App Store (App Review Guideline 2.4.5) erlauben es Apps nur, die Daten einer anderen App, etwa Lesezeichen, über dafür gemachte macOS-APIs zu ändern. Safari bietet keine solche API für Lesezeichen.',
        ],
      },
      {
        question: 'Was brauche ich dafür?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'Einen Mac mit macOS Ventura 13 oder neuer und Safari 16.4 oder neuer. Bei der Einrichtung wählst du einmal die Lesezeichendatei von Safari und schaltest die Erweiterung mit „Alle Websites: Erlauben“ ein.',
        ],
      },
      {
        question: 'Warum braucht es Zugriff auf alle Websites?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'Damit die Taste in der Symbolleiste die Adresse der Seite sieht, auf der du bist, und sie mit deinen Lesezeichen vergleicht. Es fügt Websites keine Skripte hinzu und liest nicht, was auf der Seite steht.',
        ],
      },
      {
        question:
          'Warum zeigt eine Seite „Not saved“, obwohl ich einen ähnlichen Link gespeichert habe?',
        open: false,
        kind: 'match',
        paragraphs: [],
      },
      {
        question: 'Funktioniert es mit Safari-Profilen?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'Bookmark Status folgt immer einer Lesezeichendatei und nutzt sie in jedem Safari-Profil. Für die Lesezeichen eines anderen Profils wählst du in der App mit Choose a Different File… dessen Lesezeichendatei.',
        ],
      },
      {
        question: 'Was passiert, wenn ich das Fenster schließe?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'Die App verschwindet aus dem Dock, läuft aber weiter, damit die Taste in der Symbolleiste funktioniert. Über das Lesezeichensymbol in der Menüleiste öffnest du das Fenster wieder, öffnest den Lesezeichenbaum oder beendest die App.',
        ],
      },
      {
        question: 'Was kostet es?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'PRICE_TBD. Der Preis wird zum Start im Mac App Store bestätigt.',
        ],
      },
    ],
  },
  nl: {
    eyebrow: 'FAQ',
    title: 'Vragen en antwoorden.',
    addBefore:
      'Daarom leest Bookmark Status het bladwijzerbestand van Safari alleen en schrijft er nooit naar. Om bladwijzers toe te voegen of op te ruimen gebruik je de eigen functies van Safari: Voeg bladwijzer toe (',
    addBetween: ') en de bladwijzer-editor (',
    addAfter: ').',
    addKeysLabel: 'Command D',
    addKeys: ['⌘', 'D'],
    editorKeysLabel: 'Option Command B',
    editorKeys: ['⌥', '⌘', 'B'],
    matchBefore:
      'De vergelijking is exact: een ander pad of een andere query telt als een andere pagina. Het deel na ',
    matchAfter:
      ' en één slash aan het eind worden genegeerd. Alleen webbladwijzers (http en https) tellen mee, de leeslijst en de geschiedenis niet. Is precies deze pagina niet bewaard, dan zegt de tip hoeveel pagina’s van die site wel bewaard zijn, en met één klik zie je ze.',
    items: [
      {
        question: 'Kan Bookmark Status bladwijzers toevoegen of verwijderen?',
        open: true,
        kind: 'add',
        paragraphs: [
          'Nee, en dat is met opzet. De regels van de Mac App Store (App Review Guideline 2.4.5) laten apps de gegevens van een andere app, zoals bladwijzers, alleen wijzigen via macOS-API’s die daarvoor bedoeld zijn. Safari biedt er geen voor bladwijzers.',
        ],
      },
      {
        question: 'Wat heb ik nodig?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'Een Mac met macOS Ventura 13 of nieuwer en Safari 16.4 of nieuwer. Bij de installatie kies je één keer het bladwijzerbestand van Safari en zet je de extensie aan met Alle websites op Sta toe.',
        ],
      },
      {
        question: 'Waarom heeft hij toegang tot alle websites nodig?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'Zodat de knop in de knoppenbalk het adres van de pagina waarop je bent kan zien en met je bladwijzers kan vergelijken. Hij voegt geen scripts toe aan websites en leest niet wat er op de pagina staat.',
        ],
      },
      {
        question:
          'Waarom toont een pagina “Not saved” terwijl ik een vergelijkbare link heb bewaard?',
        open: false,
        kind: 'match',
        paragraphs: [],
      },
      {
        question: 'Werkt het met Safari-profielen?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'Bookmark Status volgt één bladwijzerbestand tegelijk en gebruikt het in elk Safari-profiel. Wil je de bladwijzers van een ander profiel volgen, kies dan in de app met Choose a Different File… het bladwijzerbestand van dat profiel.',
        ],
      },
      {
        question: 'Wat gebeurt er als ik het venster sluit?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'De app verdwijnt uit het Dock maar blijft draaien, zodat de knop in de knoppenbalk blijft werken. Met het bladwijzersymbool in de menubalk open je het venster weer, open je de bladwijzerboom of stop je de app.',
        ],
      },
      {
        question: 'Wat kost het?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'PRICE_TBD. De prijs wordt bij de lancering in de Mac App Store bevestigd.',
        ],
      },
    ],
  },
};
