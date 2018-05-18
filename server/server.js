import Koa from 'koa'
import KoaStatic from 'koa-static'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import fs from 'fs'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import schema from './graphql/schema'
import config from './config'

const app = new Koa()
const router = new Router()

const port = process.env.PORT || config.port
const host = process.env.HOST || config.host

app.use(bodyParser())
app.use(KoaStatic(__dirname, '../build'))

router.all('/graphql', graphqlKoa({ schema }))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

router.get('*', (ctx, next) => {
    ctx.body = fs.readFileSync('../build/index.html', 'utf-8')
})

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(port, () => console.log(`server running on http://${host}:${port}`))