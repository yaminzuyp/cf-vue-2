import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Static file handler (Vue/HTML dist folder)
app.use('*', serveStatic({ root: './dist' }))

// GET all messages
app.get('/api/messages', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM messages ORDER BY id DESC').all()
  return c.json({ messages: results })
})

// POST new message
app.post('/api/messages', async (c) => {
  const body = await c.req.json()
  const content = body.content
  await c.env.DB.prepare('INSERT INTO messages (content) VALUES (?)').bind(content).run()
  return c.json({ success: true })
})

export default app
