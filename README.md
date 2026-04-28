# Atlas Image Extractor (React + Vite)

This app solves the "1000 images in frontend" problem by using one large atlas image and
extracting individual images based on coordinate metadata.

## What it does

- Upload a large atlas/sprite-sheet image.
- Paste coordinates JSON as:

```json
[
  { "id": "img-001", "x": 0, "y": 0, "width": 64, "height": 64 }
]
```

- Preview sub-images directly from the single atlas via CSS background positioning.
- Select any tile and download it as a standalone PNG (via `<canvas>` crop).

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```
