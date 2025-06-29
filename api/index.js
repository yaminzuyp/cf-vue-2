import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// API routes dulu
app.get('/api/messages', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM messages ORDER BY id DESC').all()
  return c.json({ messages: results })
})

app.post('/api/messages', async (c) => {
  const body = await c.req.json()
  const content = body.content
  await c.env.DB.prepare('INSERT INTO messages (content) VALUES (?)').bind(content).run()
  return c.json({ success: true })
})

// Baru serve static
app.use('*', async (c, next) => {
  try {
    return await serveStatic({ root: './dist' })(c, next)
  } catch (e) {
    console.error('Static error:', e)
    return next()
  }
})

export default app
