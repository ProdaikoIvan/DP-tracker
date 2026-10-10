# Telegram Bot & Cloudflare Worker (D1 Database) Setup

This service provides real-time Telegram push notifications when available appointment slots are found by the **DP Tracker** Chrome Extension. It uses **Cloudflare Workers** and **Cloudflare D1 SQL Database** for zero-latency, globally consistent synchronization.

---

## 1. Create a Telegram Bot

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send the `/newbot` command.
3. Choose a name (e.g., `DP Tracker Notify`) and a username (e.g., `dp_tracker_notify_bot`).
4. Copy the generated API token (e.g., `8921477373:AAFrvjty...`).

---

## 2. Cloudflare D1 Database & Worker Setup

### Step A: Create D1 SQL Database
1. Log in to your [dash.cloudflare.com](https://dash.cloudflare.com) dashboard.
2. In the left navigation menu, go to **Storage & databases** ➡️ **D1 SQL Database**.
3. Click **Create database**.
4. Enter the name:
   ```text
   dp-tracker-db
   ```
5. Click **Create**. *(Tables will be created automatically on first request).*

### Step B: Create & Configure the Worker
1. Go to **Compute** ➡️ **Workers & Pages** ➡️ **Create application** ➡️ **Create Worker**.
2. Name the worker `dp-tracker-telegram` and save/deploy template.
3. Open the worker's page ➡️ **Settings** tab ➡️ **Bindings** (or **Variables and Secrets**):
   - **D1 Database Bindings**: Click **Add binding**:
     - Variable name: `DB` *(Must be uppercase)*
     - D1 database: select `dp-tracker-db`
   - **Environment Variables / Secrets**: Click **Add variable**:
     - Variable name: `BOT_TOKEN`
     - Value: your bot token from `@BotFather`
4. Click **Save and deploy**.

### Step C: Deploy Worker Code
1. On the worker page, click **Edit code**.
2. Replace all code in `worker.js` with the contents of [`worker/worker.js`](./worker.js).
3. Click **Deploy**.

---

## 3. Register the Webhook

Set the Telegram webhook by opening the following URL in your browser (substitute your bot token and worker URL):

```text
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://<YOUR_WORKER_URL>/webhook
```

Telegram will respond with:
```json
{"ok": true, "result": true, "description": "Webhook was set"}
```

---

## 4. Current Deployment Details

- **Bot Username:** `@dp_tracker_notify_bot`
- **Bot Link:** [t.me/dp_tracker_notify_bot](https://t.me/dp_tracker_notify_bot)
- **Worker Endpoint:** `https://dp-tracker-telegram.prodaikoivan.workers.dev`
