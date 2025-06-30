import { Hono } from 'hono'

const app = new Hono()

app.get('/api/messages', async (c) => {
  const db = c.env.DB
  const { results } = await db.prepare('SELECT * FROM messages ORDER BY id DESC LIMIT 20').all()
  return c.json({ messages: results })
})

app.post('/api/messages', async (c) => {
  const db = c.env.DB
  const { content } = await c.req.json()
  await db.prepare('INSERT INTO messages (content) VALUES (?)').bind(content).run()
  return c.json({ success: true })
})

app.delete('/api/messages', async (c) => {
  const db = c.env.DB
  await db.prepare('DELETE FROM messages').run()
  return c.json({ success: true })
})

export default app
