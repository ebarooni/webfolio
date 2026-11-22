/**
 * Visit statistics with a self-hosted Umami (deploy/umami). The site
 * loads the tracker only on this host and only when a website ID is set.
 * Local runs, previews and tests therefore send nothing.
 *
 * The website ID comes from the Umami dashboard (Settings, Websites). It
 * is not a secret: every visitor sees it in the page.
 */
export const ANALYTICS = {
  host: 'barooni.dev',
  websiteId: '10e9c8f8-6d24-4e41-87be-b97161e4c771',
  // Caddy forwards this path to Umami. A neutral name on the site's own
  // address gets past more content blockers than "umami.js" on a
  // separate domain. The event endpoint (/insights/e) is set in Umami.
  scriptPath: '/insights/i.js',
} as const;

export type AnalyticsConfig = Readonly<{
  host: string;
  websiteId: string;
  scriptPath: string;
}>;
