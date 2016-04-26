import Router from 'koa-router'
import authorize from '../lib/authorize';

const router = new Router({
  prefix: '/test'
})

router
  .use(authorize.userAuth())
  .get('/', (ctx, next) => {
    ctx.body = { test: 'json' }
  })
  .post('/post', (ctx, next) => {
    ctx.body = ctx.request.body
  })

export default router
