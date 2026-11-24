# Navigation case study images

The page is `/work/digicert/platform-navigation`. The story text is `platform-navigation.mdx`. Image paths, alt text, captions, phase, and approval labels are in `navigation.ts`.

Put each file in `public/images/digicert/navigation/`. Use the basename from `navigation.ts` and `.png`, `.jpg`, `.jpeg`, or `.webp`. The page uses the uploaded file instead of the placeholder. You do not need to edit the MDX.

To add another image to a section, add a frame in `navigation.ts`, then add its id to that group’s `frames` list. Set `gallery: true` and a `galleryOrder` if it should also appear in Explore the designs.

`status` is `reference`, `exploration`, `approved`, or `candidate`. Only the initial redesign and the descriptive-heading arrow are approved. Leave other frames as `exploration` until that changes. Use `candidate` only after a banner treatment is actually selected.

The case study hero and the DigiCert collection thumbnail both use `public/images/digicert/navigation/featured.png`. Replace that file to change the featured image.

## What to upload first

1. `04-mobile-board` — mobile navigation board in the mobile-first section.
2. `11-approved-heading-arrow` — approved heading and Neutral 500 arrow.

## Every frame

| File | Section | Upload |
| --- | --- | --- |
| `01-legacy-navigation` | Starting point | Legacy panel with the side promotional area |
| `01-legacy-navigation-columns` | Starting point | A second legacy panel with a different column or background treatment |
| `02-initial-redesign` | First approval | Approved redesigned panel |
| `03-heading-alignment-cases` | Initial structure | One headed column, other columns unheaded |
| `03-heading-alignment-cases-center` | Initial structure | Heading only in the center column |
| `03-heading-alignment-cases-later` | Initial structure | First column unheaded, second and third headed |
| `03-heading-alignment-cases-outer` | Initial structure | Headed outer columns, unheaded center |
| `03-heading-alignment-cases-none` | Initial structure | No column headings |
| `04-mobile-board` | Mobile-first | Mobile navigation board across the main sections |
| `05-platform-umbrella-desktop` | Platform hierarchy | Desktop platform umbrella |
| `06-platform-umbrella-mobile` | Platform hierarchy | Mobile platform umbrella |
| `07-two-column-test` | Column capacity | Two-column tests, with a header, a missing header, and no header |
| `08-three-column-test` | Column capacity | Three-column tests, with a header, a missing header, and no header |
| `09-four-column-test` | Column capacity | Four-column tests, with a header, a missing header, and no header |
| `10-descriptive-column-explorations` | Link cues | Alternative descriptive-column layouts |
| `11-approved-heading-arrow` | Link cues | Approved heading-and-arrow treatment |
| `11-approved-heading-arrow-closeup` | Link cues | Close-up of the Neutral 500 arrow |
| `11-approved-heading-arrow-states` | Link cues | Mobile, hover, or focus, only if designed |
| `12-navigation-banner-explorations` | Promotional banner | Banner explorations inside the panel |
| `12-navigation-banner-without` | Promotional banner | Comparable panel without a banner |
| `12-navigation-banner-candidate` | Promotional banner | Recommended treatment, only after one is selected |
| `13-navigation-banner-mobile` | Promotional banner | Longer copy or a responsive banner, if explored |

Include Figma alignment marks on the heading frames only when those marks already exist. Do not draw a rule that is not in the file.
