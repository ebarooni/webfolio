/*
 * Writes sitemap.xml from the prerendered pages after "ng build".
 *
 * The prerendered HTML is the single source: each page that is its own
 * canonical page and that search engines may list goes into the sitemap,
 * with its hreflang links and, for an article, the date of its last
 * change (dateModified in the structured data). The script also checks that the hreflang links
 * of all pages point back to each other, as search engines require. A
 * missing link stops the build.
 *
 * Usage: node scripts/generate-sitemap.mjs [browser output directory]
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SITE_URL = "https://barooni.dev";
const outputDirectory = process.argv[2] ?? "dist/webfolio/browser";

function findPages(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return findPages(path);
    }

    return entry.name === "index.html" ? [path] : [];
  });
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1] ?? null;
}

function readPage(file) {
  const html = readFileSync(file, "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  const links = head.match(/<link\s[^>]*>/g) ?? [];
  const metas = head.match(/<meta\s[^>]*>/g) ?? [];
  const folder = relative(outputDirectory, file)
    .split(sep)
    .slice(0, -1)
    .join("/");
  const url = folder === "" ? `${SITE_URL}/` : `${SITE_URL}/${folder}`;
  const canonical = links.find((tag) => attribute(tag, "rel") === "canonical");
  const robots = metas.find((tag) => attribute(tag, "name") === "robots");
  const alternates = links
    .filter((tag) => attribute(tag, "rel") === "alternate")
    .map((tag) => ({
      hreflang: attribute(tag, "hreflang"),
      href: attribute(tag, "href"),
    }))
    .filter((alternate) => alternate.hreflang && alternate.href);

  // Only articles carry a date that really tells when the text changed.
  const modified = head.match(/"dateModified":"(\d{4}-\d{2}-\d{2})"/)?.[1];

  return {
    url,
    lastModified: modified ?? null,
    canonical: canonical ? attribute(canonical, "href") : null,
    noIndex: (robots ? attribute(robots, "content") : "").includes("noindex"),
    alternates,
  };
}

const pages = findPages(outputDirectory).map(readPage);
const listed = pages
  .filter((page) => page.canonical === page.url && !page.noIndex)
  .sort((first, second) => first.url.localeCompare(second.url));
const listedByUrl = new Map(listed.map((page) => [page.url, page]));
const problems = [];

for (const page of listed) {
  for (const alternate of page.alternates) {
    const target = listedByUrl.get(alternate.href);

    if (!target) {
      problems.push(`${page.url}: ${alternate.href} is not a listed page`);
    } else if (!target.alternates.some((back) => back.href === page.url)) {
      problems.push(`${alternate.href} has no hreflang link to ${page.url}`);
    }
  }
}

if (problems.length > 0) {
  console.error(
    `Sitemap: the hreflang links do not match:\n${problems.join("\n")}`,
  );
  process.exit(1);
}

const escape = (text) =>
  text.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
const entries = listed.map((page) => {
  const links = page.alternates.map(
    (alternate) =>
      `    <xhtml:link rel="alternate" hreflang="${escape(alternate.hreflang)}" href="${escape(alternate.href)}" />`,
  );

  return [
    "  <url>",
    `    <loc>${escape(page.url)}</loc>`,
    ...(page.lastModified
      ? [`    <lastmod>${page.lastModified}</lastmod>`]
      : []),
    ...links,
    "  </url>",
  ].join("\n");
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries,
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(outputDirectory, "sitemap.xml"), sitemap);
console.log(`Sitemap: ${listed.length} pages, hreflang links match.`);
