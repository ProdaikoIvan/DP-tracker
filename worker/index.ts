interface Env {
  BOT_TOKEN: string;
  DB: D1Database;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const sendTelegramMessage = async (token: string, chatId: number | string, text: string) => {
  return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
};

const initDb = async (db: D1Database) => {
  await db
    .prepare(
      'CREATE TABLE IF NOT EXISTS sessions (code TEXT PRIMARY KEY, chat_id TEXT NOT NULL, created_at INTEGER NOT NULL)'
    )
    .run();
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (url.pathname === '/check' && request.method === 'GET') {
      const code = url.searchParams.get('code');
      if (!code) {
        return Response.json({ error: 'Missing code' }, { status: 400, headers: CORS_HEADERS });
      }

      await initDb(env.DB);
      const row = await env.DB.prepare('SELECT chat_id FROM sessions WHERE code = ?').bind(code).first();
      return Response.json({ connected: Boolean(row) }, { headers: CORS_HEADERS });
    }

    if (url.pathname === '/notify' && request.method === 'POST') {
      const { code, text } = (await request.json()) as { code?: string; text?: string };
      if (!code || !text) {
        return Response.json({ error: 'Missing fields' }, { status: 400, headers: CORS_HEADERS });
      }

      await initDb(env.DB);
      const row = (await env.DB.prepare('SELECT chat_id FROM sessions WHERE code = ?').bind(code).first()) as {
        chat_id: string;
      } | null;
      if (!row) {
        return Response.json({ error: 'Not connected' }, { status: 404, headers: CORS_HEADERS });
      }

      await sendTelegramMessage(env.BOT_TOKEN, row.chat_id, text);
      return Response.json({ ok: true }, { headers: CORS_HEADERS });
    }

    if (url.pathname === '/webhook' && request.method === 'POST') {
      const update = (await request.json()) as {
        message?: { text?: string; chat: { id: number; username?: string } };
      };
      const message = update.message;

      if (message?.text?.startsWith('/start')) {
        const parts = message.text.trim().split(/\s+/);
        const code = parts[1];

        if (code) {
          await initDb(env.DB);
          await env.DB.prepare(
            'INSERT OR REPLACE INTO sessions (code, chat_id, created_at) VALUES (?, ?, ?)'
          )
            .bind(code, String(message.chat.id), Date.now())
            .run();

          await sendTelegramMessage(
            env.BOT_TOKEN,
            message.chat.id,
            '✅ <b>DP Tracker успішно підключено!</b>\n\nТепер ви миттєво отримуватимете сповіщення про знайдені дати.'
          );
        } else {
          await sendTelegramMessage(
            env.BOT_TOKEN,
            message.chat.id,
            '👋 <b>Вітаємо в DP Tracker Bot!</b>\n\nДля підключення відкрийте розширення, зайдіть у Налаштування та натисніть «Підключити Telegram».'
          );
        }
      }

      return Response.json({ ok: true });
    }

    return new Response('Not Found', { status: 404, headers: CORS_HEADERS });
  },
};
