# Training – bilingual UI/UX page

Interactive English/Arabic page: sticky navbar, side menu, animated red box, rotating 3D heart.

## Run
Open `index.html`. To load the optional `assets/heart.glb`, serve the folder (browsers block local file loading):
`python3 -m http.server` then visit http://localhost:8000

## Structure
- `index.html` – markup
- `css/style.css` – styling
- `js/script.js` – language switch, updates, animation, 3D heart
- `assets/heart.glb` – optional anatomical model
- `PROMPT.docx` – the original project prompt
