# Arunima Anand — Portfolio

Personal portfolio with a pink flower theme, interactive skills, projects, and a current-year GitHub contribution calendar.

Intended website: https://arunimaanand.github.io/

## Local preview

```sh
python3 -m http.server 4174
```

Visit http://localhost:4174. No install or build step is required.

## Publishing

GitHub Pages serves the root of the main branch. After Pages is enabled, commits to main publish updates to the same website address.

- `index.html`: page content, browser title, and project diagrams
- `flower.svg`: pink flower favicon
- CSS files: styles loaded by index.html
- `script.js`: interactive flower, theme, skills, and project notes
- `github-calendar.js`: live contribution calendar for the current year
- `github-initial.json`: dated fallback data used if the public contribution API is unavailable

The contribution calendar refreshes when visitors load the page and when the Pacific date changes while the page is open. The existing separately scheduled cache refresh is managed outside this repository.
