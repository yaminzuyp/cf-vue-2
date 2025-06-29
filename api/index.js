import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve file statis dari ASSETS binding
app.use('/assets/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

// Fallback ke index.html untuk SPA routing (Vue Router)
app.get('*', serveStatic({ path: './index.html' }))

// Contoh endpoint API
app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Hono!' })
})

export default app
