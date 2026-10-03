# Story sharing — October 3, 2026

The Stories page is a manually curated collection. The first eight cards point to existing articles in the founder-controlled Made Sick pckt.blog publication. The founder authorized this initial feature collection on October 3, 2026. Covers are served locally; article bodies stay at their source. Publication dates describe the source articles, not current implementation status.

The homepage previews three articles and links to the full collection. Topic filters and Load more progressively enhance the page; all stories are available without JavaScript. Direct links lead to the Made Sick publication and its Bluesky account. No feed is fetched from third parties when opening the Stories page.

## Adding another creator

Before featuring a story, record the creator's specific permission for its title, excerpt, image, attribution and source link, plus the agreed correction and removal route. Keep private correspondence out of the public repository. Directory enrollment, a public post, a Story Finder export, a reply, a follow or an invitation is not story-feature permission.

Remove the card and any locally held cover when that feature permission is withdrawn, then deploy the removal. The creator controls the original publication. Independently saved copies may remain. No automated indexing, cross-posting, public submission form or background publishing was added.

## Directory, resources and invitations

The full creator directory lives on `directory.html`; the homepage keeps three creator previews alongside three article previews. The five Bluesky resource cards live in a separately labeled Tools & communities section on the directory page. `stories.html` contains the article collection only.


pckt.blog, Germ Network, Streamplace, Leaflet and AXSChat are independent resource references, not enrolled participants or confirmed partners. Their cards do not claim they share the full Loptr Lab economic mission. No invitation has been sent by this change.

Public invitation drafts start with “Greetings”. Outreach remains a separate, explicitly authorized action. A response does not authorize a story card or partnership announcement.

## Validation

Run `npm ci --prefix tests` and `npm test --prefix tests`. The existing link-integrity suite covers the new page, local cover files and navigation targets. Story tests cover the no-JavaScript collection, filter reset, pagination and focus after Load more. Device acceptance on iPad Safari remains a separate check.
