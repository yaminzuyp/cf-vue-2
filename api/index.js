import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve frontend
app.use('*', serveStatic({ root: './dist' }))

// Get all messages
app.get('/api/messages', async (c) => {
  const db = c.env.DB
  const { results } = await db.prepare('SELECT * FROM messages ORDER BY created_at DESC LIMIT 100').all()
  return c.json(results)
})

// Add new message
app.post('/api/messages', async (c) => {
  const db = c.env.DB
  const { username, content } = await c.req.json()
  await db.prepare('INSERT INTO messages (username, content) VALUES (?, ?)').bind(username, content).run()
  return c.json({ success: true })
})

export default app
