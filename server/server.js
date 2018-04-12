import Koa from 'koa'
import KoaStatic from 'koa-static'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import schema from './graphql/schema'

const app = new Koa()
const router = new Router()

const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

app.use(bodyParser())
app.use(KoaStatic(__dirname, 'public'))

router.get('/', (ctx, next) => {
    ctx.body = 'index'
})

router.all('/graphql', graphqlKoa({ schema }))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(port, () => console.log(`server running on http://${host}:${port}`))