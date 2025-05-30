import { serve } from '@hono/node-server'
import app from './server'
import 'dotenv/config'

const port = parseInt(process.env.PORT || '3000', 10)

serve({ fetch: app.fetch, port }, ({ port }) => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})
