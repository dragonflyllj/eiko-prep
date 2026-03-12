# Eikō Prep 🌟
### International School Readiness App — Japan

A Progressive Web App (PWA) to help children aged 4–7 prepare for international school admission tests in Japan.

## Features
- 3 difficulty levels: Pre-K, Grade 1 Entry, Grade 2 Entry
- 5 practice sections: Writing ✏️, Phonics 📖, Spelling 🔤, Speaking 🗣️, Math ➕
- Works offline (PWA)
- No API calls, no accounts, no subscriptions
- Progress tracking via localStorage
- Bilingual (English / Japanese labels for parents)
- Child-friendly UI with encouraging feedback

## Deploy to Railway
1. Push this repo to GitHub
2. Connect GitHub repo to Railway
3. Railway auto-detects `package.json` and deploys
4. Set custom domain (optional)

## Android (TWA)
After deploying to Railway:
1. Get your Railway URL (e.g. `https://eiko-prep.railway.app`)
2. Go to https://www.pwabuilder.com
3. Enter your URL → Build → Android (TWA)
4. Download the APK / AAB
5. Submit to Google Play Store

## Google Play Store Checklist
- [ ] App icons (192x192, 512x512) — generate at https://realfavicongenerator.net
- [ ] Privacy policy (required) — simple template: no data collected, localStorage only
- [ ] Screenshots (phone + 7-inch tablet)
- [ ] Store listing in Japanese + English
- [ ] Content rating: Everyone / PEGI 3
- [ ] Price: ¥600–¥980 suggested

## Local dev
```
npm install
npm run dev
# open http://localhost:3000
```
