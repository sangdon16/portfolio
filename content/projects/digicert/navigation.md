# Navigation case study images

The page is `/work/digicert/platform-navigation`. The story text is `platform-navigation.mdx`. Image paths, alt text, captions, phase, and approval labels are in `navigation.ts`.

Put each file in `public/images/digicert/navigation/`. Use the basename from `navigation.ts` and `.webp`. The page uses the uploaded file instead of the placeholder. You do not need to edit the MDX.

To add another image to a section, add a frame in `navigation.ts`, then add its id to that group’s `frames` list. Set `gallery: true` and a `galleryOrder` if it should also appear in Explore the designs.

`status` is `reference`, `exploration`, `approved`, `candidate`, or `selected`. The initial redesign and the descriptive-heading arrow are approved. The four promotional banners are `selected` authorable options. That selection does not mean the authoring functionality is implemented.

The case study hero and the DigiCert collection thumbnail both use `public/images/digicert/navigation/featured.webp`. Replace that file to change the featured image.

## What to upload first

1. `04-mobile-board` — mobile navigation board in the mobile-first section.
2. `11-approved-heading-arrow` — approved desktop heading and arrow.

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
| `11-approved-heading-arrow` | Link cues | Approved desktop heading-and-arrow treatment |
| `11-approved-heading-arrow-mobile` | Link cues | Approved mobile heading-and-arrow treatment |
| `12-promo-overview` | Promotional banner | Overview of the four selected authorable banners |
| `12-promo-image-desktop` | Promotional banner | Image-led desktop banner |
| `12-promo-image-mobile` | Promotional banner | Image-led banner inside the mobile navigation |
| `12-promo-image-mobile-large` | Promotional banner | Larger image-led mobile banner |
| `12-promo-image-mobile-compact` | Promotional banner | Compact image-led mobile banner |
| `12-promo-background-desktop` | Promotional banner | Decorative-background desktop banner |
| `12-promo-background-mobile` | Promotional banner | Decorative-background banner on a small screen |
| `12-promo-icon-desktop` | Promotional banner | Icon-led desktop banner |
| `12-promo-icon-mobile` | Promotional banner | Icon-led banner on a small screen |
| `12-promo-text-desktop` | Promotional banner | Text-led desktop banner |
| `12-promo-text-mobile` | Promotional banner | Text-led banner on a small screen |

Include Figma alignment marks on the heading frames only when those marks already exist. Do not draw a rule that is not in the file.
