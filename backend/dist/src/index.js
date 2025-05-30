// // src/index.ts
// import { serve } from '@hono/node-server';
// import app from '../server';
// import 'dotenv/config';
// const port = Number(process.env.PORT || 3000);
// serve({ fetch: app.fetch, port }, ({ port }) => {
//     console.log(`🚀  Server running on http://localhost:${port}`);
// });


// src/index.ts
import { serve } from '@hono/node-server'
import app from './server'
import 'dotenv/config'

// 安全なポート取得
const rawPort = process.env.PORT
const port = Number(rawPort)

if (!port || isNaN(port)) {
  console.error(`❌ Invalid or missing PORT environment variable: "${rawPort}"`)
  process.exit(1)
}

// 🚨 重要：第2引数のコールバックを必ず渡す！！
serve({ fetch: app.fetch, port }, () => {
  console.log(`✅ Server listening on http://localhost:${port}`)
})

