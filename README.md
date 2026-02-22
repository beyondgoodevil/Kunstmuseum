# The Eternal Gallery — Painting Gallery Site

A beautiful, static web gallery that displays random historical paintings of **religious**, **mythological**, and **literary/philosophical** figures — sourced live from [Wikimedia Commons](https://commons.wikimedia.org).

## Features

- 🎨 **Random painting** — click once to discover a new masterpiece
- 🗂️ **Category filter** — browse by Religious, Mythological, or Literary & Philosophical themes
- 📋 **Rich metadata panel** — painter name, year, medium, dimensions, collection, and description
- 🔗 **Direct Wikimedia link** — view the full file on Commons
- 🌐 **No backend needed** — all data fetched client-side via the Wikimedia Commons public API

## Deploying to GitHub Pages

1. Push the contents of this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under *Source*, select `main` branch and `/ (root)` folder.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Project Structure

```
painting-gallery-site/
├── index.html          # Main page
├── css/
│   └── style.css       # All styling
├── js/
│   ├── categories.js   # Curated Wikimedia Commons category list
│   └── app.js          # API logic & UI
└── README.md
```

## How It Works

The site uses the **Wikimedia Commons MediaWiki API** (no API key required):

1. Picks a random category from the selected theme (e.g. `Category:Venus in art`)
2. Fetches up to 100 file members from that category
3. Filters for image files (JPG/PNG) and picks one at random
4. Fetches `extmetadata` for the chosen file to get artist, date, medium, description, etc.
5. Displays the image and metadata

All images are in the **public domain** or under open licenses as provided by Wikimedia Commons.

## Categories Covered

### Religious (~25 categories)
Jesus, Virgin Mary, Saints, Annunciation, Crucifixion, Last Supper, Adoration, Buddhist art, Hindu deities, and more.

### Mythological (~27 categories)
Venus, Apollo, Diana, Mars, Jupiter, Hercules, Perseus, Prometheus, Medusa, Norse gods, and more.

### Literary & Philosophical (~25 categories)
Dante, Shakespeare's characters (Hamlet, Ophelia, Romeo & Juliet), Greek heroes, Socrates, Plato, Don Quixote, Faust, and more.
