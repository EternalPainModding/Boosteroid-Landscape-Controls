# Boosteroid Custom Control Bar

A lightweight Tampermonkey userscript that adds a **custom floating control bar** to the Boosteroid web client.

It is especially useful on **tablets and mobile devices** in landscape mode, where the official Boosteroid top bar is often missing or hard to access.

> **Made with AI**  
> This project was created with the help of AI (Grok by xAI).  
> Feel free to use, modify, copy, sell, or do **whatever you want** with the code. No restrictions.

## Features

- **Custom control bar** that appears at the bottom of the screen during a game session
- **Fullscreen** button – uses the real browser Fullscreen API
- **Menu** button – attempts to open the native Boosteroid overlay (Quality, Keyboard, etc.)
- **Hide** button – hides the custom bar
- Small **⚙** button in the bottom-right corner to bring the bar back anytime
- Auto-hides after 25 seconds
- Works on tablets without a keyboard
- Does **not** modify or break the normal Boosteroid website

## Installation

1. Install **[Tampermonkey](https://www.tampermonkey.net/)** (Chrome, Edge, Firefox, Kiwi, Lemur, etc.)
2. Install the script manually or via the raw GitHub link after uploading.

### Manual installation

1. Open Tampermonkey → Dashboard → `+` (Create a new script)
2. Delete the default template
3. Paste the contents of `boosteroid-custom-control-bar.user.js`
4. Save (`Ctrl + S` / `Cmd + S`)

## Usage

1. Start any game on Boosteroid web
2. A small **⚙** button appears in the bottom-right corner
3. Tap it → the custom control bar appears at the bottom center
4. Use the buttons:
   - **⛶ Fullscreen** → toggles real browser fullscreen
   - **☰ Menu** → tries to open Boosteroid’s native options (Quality, Keyboard, Settings…)
   - **✕ Hide** → hides the custom bar
5. The bar automatically disappears after 25 seconds
6. Tap the **⚙** button again whenever you need it

## Compatibility

| Platform          | Status          | Notes                        |
|-------------------|-----------------|------------------------------|
| Android + Kiwi    | ✅ Recommended  | Best results                 |
| Android + Edge    | ✅ Works well   |                              |
| Android + Lemur   | ✅ Works        |                              |
| iPad (Safari)     | ⚠️ Limited      | Fullscreen may be restricted |
| Desktop           | ✅ Works        |                              |

## License / Freedom

**Public Domain (Unlicense)**

You can do **whatever you want** with this code:
- Copy it
- Modify it
- Sell it
- Rebrand it
- Use it commercially
- Include it in other projects

No attribution required (but appreciated).

## Disclaimer

This is an unofficial community script.  
It is **not** affiliated with or endorsed by Boosteroid.  
Use at your own risk.

## Credits

Created with the assistance of **Grok (xAI)**.
