// src/index.ts
import { serve } from '@hono/node-server'
import app from './server'

// 明示的に型付きで処理
const rawPort = process.env.PORT
const port = rawPort ? Number(rawPort) : 3000

if (isNaN(port)) {
  console.error(`❌ Invalid port value: "${rawPort}"`)
  process.exit(1)
}

console.log(`✅ PORT resolved: ${port}`)

serve({ fetch: app.fetch, port }, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})
