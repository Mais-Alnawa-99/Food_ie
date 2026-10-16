# Foodie App

A React Native recipe discovery and personal recipe-book prototype built with Expo.

## Features
- Scrollable recipe feed with 10+ horizontal food categories
- Recipe detail screen with ingredients, step-by-step instructions, prep time, servings, calories, and difficulty
- Toggleable favorites
- My Food / My Recipes collection
- Create, edit, and delete personal recipes
- Image selection with Expo ImagePicker
- Back navigation from details and form screens
- Sample recipes included for immediate exploration

## Open in Expo Snack
**Direct Snack preview:** https://snack.expo.dev/?name=Foodie&dependencies=expo-image-picker&sourceUrl=https%3A%2F%2Fraw.githubusercontent.com%2FMais-Alnawa-99%2FFood_ie%2Fmain%2FApp.js&platform=web

The direct preview loads `App.js` from this public repository. Open it in Snack, wait for the web preview, and use **Save** if you want to keep a named Snack in your account.

## Import the GitHub repository
1. Open https://snack.expo.dev/
2. Choose **Import Git Repository**.
3. Try this repository URL, including `.git`: https://github.com/Mais-Alnawa-99/Food_ie.git
4. If Snack still shows an import error, use the direct Snack preview link above.

## Run locally (optional)
Install Node.js and npm, then run:

```sh
npm install
npx expo start
```

## Notes
- Recipe data and favorites are held in React state for this prototype. They reset when the app is fully reloaded; there is no backend or cross-device sync.
- Selected images use the device/browser-provided URI. For persistent, shareable recipe images, upload them to a storage service and save the resulting URL.
- External food photos need an internet connection.
