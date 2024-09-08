import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { usersRouter } from './micro-services/Users/users.router'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/",usersRouter)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
