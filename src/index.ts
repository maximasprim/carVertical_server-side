import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { usersRouter } from './micro-services/Users/users.router'
import { vehiclesRouter } from './micro-services/vehicles/vehicles.router'
import { vehiclesStatusRouter } from './micro-services/vehicles status/vehicles_status.router'
import { transactionsRouter } from './micro-services/Transactions/transactions.router'


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/",usersRouter)
app.route("/",vehiclesRouter)
app.route("/",vehiclesStatusRouter)
app.route("/",transactionsRouter)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
