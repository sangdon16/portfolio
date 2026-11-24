# Don folio

Personal portfolio built with Next.js, Tailwind CSS, and MDX. Content lives in `content/`. Layout lives in `components/` and `app/`.

## Add a project

Works page destinations are the MDX files in `content/projects/`.

DigiCert project:

1. Add `content/projects/digicert/your-slug.mdx`.
2. Set `kind: case-study` and `collection: digicert`.
3. Set `title`, `summary`, `label`, `cover`, and `coverAlt`.
4. Set `order` to place it on the DigiCert page.
5. The page is `/work/digicert/your-slug`.

Copy `content/projects/digicert/balancing-content-and-conversion.mdx` as a starting point.

Set `featured: true` on a top-level project to show it on the homepage. `order` controls the sort.

## Case study fields

Omit a field to hide it.

- `label` — short project type, shown above the title
- `role`, `scope`, `collaborators`, `timeframe`, `status`
- `coverCaption` — caption for the large preview

Sections:

- `<Section id="problem" title="...">` for the problem. Put constraints in a `<Callout title="Constraints">`.
- `<Decision id="question" title="...">` for a key decision. Inside it, use `<Alternatives>` and `<Alternative src alt caption>`, then `<Callout>` blocks for trade-offs, feedback, your recommendation, and the team decision.
- `<Section>` again for the recommended direction, responsive behavior, current status, and a short reflection.

`<Alternative>` images open in the page image viewer. Headings with an `id` appear in “On this page”.

Write recommendations separately from the team’s decision and the implementation status. Leave unknown details as `Placeholder.` Do not add research, feedback, quotes, metrics, or outcomes you do not have.

## Update text

- Homepage, navigation, email, and footer: `content/site.ts`
- About: `content/about.mdx`
- Projects: the MDX file for that project

`linkedinUrl` and `coffeeUrl` in `content/site.ts` are empty. Add a URL when you have one. Until `coffeeUrl` is set, “Buy me a coffee!” opens an email to you.

## Replace images

- Portrait: replace `public/images/portrait.webp`
- Project covers: change `cover` in frontmatter, and put the file in `public/images/projects/`
- Case study images: change the `src` on `<Alternative>` or `<Figure>`

Placeholder images live in `public/images/placeholders/`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.
