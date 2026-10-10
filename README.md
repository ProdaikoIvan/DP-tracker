# DP Tracker

A Google Chrome Extension (Manifest V3) for automated monitoring and tracking of available appointment slots in the electronic queue of the State Enterprise "Document" (Passport Service — [pasport.org.ua](https://pasport.org.ua)).

---

## 🎯 Purpose (What it is and why it's needed)

Booking an appointment for passport and document services at "DP Document" centers across Ukraine and Europe is often challenging due to limited slot availability and high demand. 

**DP Tracker** automates this process:
* **Background Monitoring:** Continuously checks for open appointment dates at user-defined intervals (e.g., every 1, 2, 3, or 5 minutes) without requiring manual page reloads.
* **Smart Session Injection:** Leverages the active tab's session to query the queue directly, bypassing anti-bot restrictions and maintaining legitimate session headers.
* **Instant Alerts:** Triggers a pleasant polyphonic audio alert (Web Audio API) and a blinking badge on the extension icon as soon as free slots are detected.
* **Telegram Push Notifications:** 1-click connection to a Telegram Bot ([Cloudflare Worker + D1 Database](./worker/README.md)) for instant alerts on mobile and desktop devices.
* **Multi-City Support:** Allows tracking multiple service centers simultaneously with live countdown timers.
* **Directory & Auto-Detection:** Includes a built-in searchable catalog of all official centers (Ukraine, Poland, Czech Republic, Germany, Slovakia, Spain, Italy, etc.) and auto-detects the active center when browsing `pasport.org.ua`.

---

## 🛠 Tech Stack

* **Core & Framework:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vite.dev/)
* **Platform:** Google Chrome Extension (Manifest V3)
  * `chrome.alarms` — Background polling scheduler
  * `chrome.scripting` — Context script injection & form data extraction
  * `chrome.storage.local` — Persistent state and found slots caching
  * `chrome.tabs` — Active tab synchronization and lifecycle monitoring
  * `chrome.action` — Dynamic extension badge alerts
* **Serverless Backend:** [Cloudflare Workers](https://workers.cloudflare.com/) + [Cloudflare D1 SQL Database](https://developers.cloudflare.com/d1/) (Telegram Webhook & Notifications)
* **Styling:** CSS Modules with centralized CSS Custom Properties (design tokens)
* **Audio:** Web Audio API (synthesized chime notifications without external assets)
* **Icons & Assets:** [Lucide React](https://lucide.dev/), [country-flag-icons](https://purecatamphetamine.github.io/country-flag-icons/)

---

## 📱 Telegram Notifications Setup

Detailed instructions for setting up and deploying the Telegram bot and Cloudflare Worker with D1 can be found in the [Worker Documentation](./worker/README.md).

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the extension:**
   ```bash
   npm run build
   ```

3. **Load in Chrome:**
   * Open `chrome://extensions/`
   * Enable **Developer mode** (top right)
   * Click **Load unpacked** and select the `dist` directory
