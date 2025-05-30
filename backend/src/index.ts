import { serve } from '@hono/node-server'
import app from './server'
import 'dotenv/config'

const rawPort = process.env.PORT
const port = Number(rawPort) || 3000

console.log(`process.env.PORT = ${rawPort}`)
console.log(`🚀 Server running on http://localhost:${port}`)

serve({ fetch: app.fetch, port }, () => {
  console.log(`✅ Listening on port ${port}`)
})
