// src/index.ts
import { serve } from '@hono/node-server'
import app from './server'

const rawPort = process.env.PORT
const port = Number(rawPort)

if (!rawPort || Number.isNaN(port)) {
  console.error(`❌ Invalid PORT from environment: "${rawPort}"`)
  process.exit(1) // Renderではこの時点で失敗ログになる
}

console.log(`✅ PORT resolved: ${port}`)


serve({ fetch: app.fetch, port }, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})
