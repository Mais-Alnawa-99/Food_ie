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

## Run in Expo Snack
1. Open https://snack.expo.dev/
2. Choose **Import Git Repository**.
3. Enter https://github.com/Mais-Alnawa-99/Food_ie
4. If Snack asks for a dependency, add `expo-image-picker`.
5. Preview on web or scan the QR code with Expo Go.

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
