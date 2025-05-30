// src/index.ts
import { serve } from '@hono/node-server'
import app from './server'

const rawPort = process.env.PORT
const parsedPort = Number(rawPort)

// isNaN() ではなく Number.isNaN() を使用し、null/undefined/空文字に強くなる
const port = !rawPort || Number.isNaN(parsedPort) ? 3000 : parsedPort

if (Number.isNaN(port)) {
  console.error(`❌ Invalid port value: "${rawPort}"`)
  process.exit(1)
}

console.log(`✅ PORT resolved: ${port}`)

serve({ fetch: app.fetch, port }, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})
