# Velirc Download Page

A simple, modern download page for Velirc apps hosted on GitHub Pages.

## Structure

```
velirc-page/
├── index.html      # Main download page
├── styles.css      # Styling
├── script.js       # Tab switching & platform detection
├── assets/         # App files directory
│   ├── logo.png           # App logo (optional)
│   ├── Velirc-macos.dmg   # macOS app
│   ├── Velirc-ios.ipa     # iOS app
│   └── Velirc-android.apk # Android app
└── README.md
```

## Setup

1. Push your app files to the `assets/` directory:
   - `Velirc-macos.dmg` - macOS application
   - `Velirc-ios.ipa` - iOS application
   - `Velirc-android.apk` - Android application
   - `logo.png` - App logo (optional, 48x48px recommended)

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Set source to "Deploy from a branch"
   - Select `main` branch and `/ (root)` folder
   - Save

3. Your download page will be available at:
   `https://<username>.github.io/velirc-page/`

## Customization

### Change App Name
Update the app name in `index.html`:
- Logo text in header
- Page title in `<title>` tag
- Download button text
- File names in download links

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;    /* Main accent color */
    --android-color: #3ddc84;    /* Android button color */
    --background: #0f0f1a;       /* Page background */
    --card-bg: #1a1a2e;          /* Card background */
}
```

### Update System Requirements
Edit the requirement text under each platform card in `index.html`.

## Features

- 🎨 Modern dark theme design
- 📱 Fully responsive layout
- 🔍 Auto-detects user's platform
- 📋 Installation instructions with tabs
- ⬇️ Direct download links

## License

MIT License
