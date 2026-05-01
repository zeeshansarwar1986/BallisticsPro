# Developer's Guide - BallisticsPro

## Architecture Overview
BallisticsPro is built using Vanilla HTML, CSS, and JavaScript. This approach was chosen to ensure maximum portability, offline support, and zero dependencies, making it highly secure and easy to deploy without complex Node.js build pipelines.

### File Structure
- `index.html`: The main UI structure and layout.
- `style.css`: Contains all Material Design 3 inspired styling, dark/night mode variables, and responsive layout grids.
- `app.js`: The application controller. Handles UI events, i18n translations, data binding, and `localStorage` profile saving.
- `ballistics.js`: The core physics engine. Handles point-mass calculations, environmental adjustments, and Coriolis effects.
- `manifest.json`: Allows the web app to be installed as a Progressive Web App (PWA) on Android devices.

## Modifying the Ballistics Engine
The `BallisticsEngine` class inside `ballistics.js` contains the mathematical logic.
- **Density Altitude**: Modify `calculateDensityAltitude()` to adjust the atmospheric model.
- **Trajectory (G7)**: The `calculateTrajectory()` method uses a simplified Euler integration for a point-mass model. If you have access to proprietary radar drag data, you can replace the constant `cDrag` multiplier with a lookup table array.
- **Advisory Logic**: The Confidence score is calculated inside `app.js` (`calculateSolution()` method). You can adjust the penalties for wind, distance, and rain to match agency doctrine.

## Adding Languages
To add a new language, open `app.js` and locate the `translations` object. Add a new key (e.g., `fr` for French) and copy the structure of the English dictionary.
Update `toggleLanguage()` in `app.js` to cycle through the new language.

## Creating a Native Android APK
If the "Add to Home Screen" PWA method is insufficient and a raw `.apk` file is strictly required, use one of the following methods:

### Option A: Capacitor (Recommended if Node.js is installed)
1. Install Node.js on your development machine.
2. Run `npm install -g @capacitor/cli`.
3. Initialize capacitor in this folder: `npx cap init BallisticsPro com.agency.ballistics`.
4. Add android: `npx cap add android`.
5. Sync the files: `npx cap sync`.
6. Open in Android Studio: `npx cap open android` and build the APK.

### Option B: Online Web-to-APK wrapper
Zip this entire folder (`d:/Task/sniper cam/`) and upload it to a trusted Web-to-APK generation service (ensure no sensitive proprietary ballistics data is included if using a public service).

## Theming and Night Mode
The Red "Night Mode" strips non-red light to preserve night vision. It is activated via the `data-theme="night"` attribute on the `<body>` tag. Colors can be adjusted in the `:root [data-theme="night"]` CSS block in `style.css`.
