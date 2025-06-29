import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files (Vue dist)
app.use('*', serveStatic({ root: './dist' }))

// API endpoint contoh
app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Hono!' })
})

export default app
