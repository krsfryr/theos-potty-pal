# Theo's Potty Pal V2

An installable, local-first parent coaching PWA. Built with plain HTML, CSS, and JavaScript, without a build step.

## Features
- One recommended daily coaching strategy, with scripts, actions, and cautions
- Parent-selectable strategy library and custom plan
- Parent-managed five-stamp reward board, selectable themes, printable physical board
- Daily checklist, bathroom event log, training ladder, progress summaries, weekly reflection
- IndexedDB persistence, offline service worker, JSON backup and import
- No cloud account or Supabase connection yet

## GitHub Pages deployment
1. Create a **public** GitHub repository.
2. Upload all the files in this folder to the repository root, including the `icons` folder and `.nojekyll` file.
3. Under **Settings → Pages**, choose **Deploy from a branch**, `main`, `/ (root)`.
4. Open the published `https://USERNAME.github.io/REPOSITORY/` URL in iPhone Safari.
5. Choose Share → Add to Home Screen.

For an existing V1 deployment, replace the app files with these V2 files. V2 uses the same IndexedDB database name and upgrades its schema without deleting existing V1 logs. Export a V1 backup first as a precaution.

## Data and privacy
Everything is stored locally in IndexedDB on that device. The service worker caches app files, not a separate database. Clearing browser data can remove records. Export JSON backups regularly. Import supports V1 and V2 backups. GitHub Pages is public, so never put child records or API secrets into the repository. No user data is transmitted to GitHub Pages beyond ordinary site requests.

Supabase is **not implemented**. A later authenticated sync layer needs private user identities, row-level security, conflict handling, and explicit consent before sharing family data.

## Reminders
This app does not send notifications. Use the existing ChatGPT daily reminder or a phone reminder.

## Development notes
This is an initial prototype and has not been validated in Safari on a physical iPhone. Browser tests and parent usability testing are recommended before routine reliance. Coaching suggestions are not medical advice. Contact a pediatrician for painful stools, suspected constipation, withholding, or persistent soiling.
