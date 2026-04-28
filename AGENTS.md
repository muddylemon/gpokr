# AGENTS.md

## Scope

These instructions apply to the whole repository.

## Project Overview

This is a Manifest V3 Chrome extension for gpokr, built with Vite, React, and `@crxjs/vite-plugin`.

- Extension manifest source: `src/manifest.js`
- Background service worker source: `src/background/index.js`
- Content script source: `src/contentScript/index.js`
- Options page source: `src/options/`
- Static extension assets: `public/`
- Build output: `build/`

## Commands

- Install dependencies: `npm install`
- Start Vite dev server: `npm run dev`
- Build extension: `npm run build`
- Format source files: `npm run fmt`

There is no test or lint script configured in `package.json` right now. Use `npm run build` as the baseline verification command after code changes.

## Development Notes

- Treat `build/`, `gpokr.zip`, `build.crx`, and `build.pem` as generated or packaged artifacts. Do not edit them directly unless the task is specifically about packaging output.
- Update `src/manifest.js` for extension permission, content script, web-accessible resource, icon, and options page changes.
- Keep extension permissions narrow. Any new Chrome permission or host permission should be tied to a concrete runtime need.
- When adding files that are loaded by gpokr pages, also update `web_accessible_resources` in `src/manifest.js` when required.
- The background worker currently creates a dynamic Declarative Net Request redirect for the gpokr turn sound. Keep rule IDs stable and avoid removing unrelated dynamic rules if more rules are added later.
- The content script is plain DOM code running on `*://gpokr.com/*`. Changes should tolerate gpokr DOM timing and selector changes.
- The options page uses Chrome extension APIs such as `chrome.storage.sync`; it is not a normal standalone React page unless those APIs are mocked.

## Style

- Follow the existing Prettier config: 2 spaces, single quotes, no semicolons, trailing commas, LF line endings, and `printWidth` 100.
- Keep JavaScript modules as ESM.
- Prefer small, targeted changes over broad refactors.
- Use `textContent` or DOM properties for user-visible content; do not introduce `innerHTML` unless there is a specific sanitized use case.

## Verification Checklist

After source changes, run:

```shell
npm run build
```

For behavior changes, also load the generated `build/` directory as an unpacked extension in Chrome and verify the affected path:

- Options page reads and writes `chrome.storage.sync` correctly.
- Custom chat buttons render on gpokr and send the configured text.
- The sound redirect still serves the intended file from `public/sounds/`.
