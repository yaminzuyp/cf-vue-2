// api/index.js
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { html } from 'hono/html'

const app = new Hono()

app.use('*', serveStatic({ root: './' }))

app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Hono!' })
})

export default app
