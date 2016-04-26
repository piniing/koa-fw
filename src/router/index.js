import Router from 'koa-router';
import authorize from '../lib/authorize';

const router = new Router();

router
    .get('/', async(ctx, next) => {

        let result = await ctx.DBModel.db('db_user').limit(3).then(result => result);

        if (result && result.length > 0) {
            ctx.body = {
                result: {
                    data: result
                }
            };
        } else {
            ctx.body = {
                error: 0,
                message: '数据不存在！'
            };
        }

    })
    .get('/set', (ctx, next) => {

        ctx.cookies.set('name', 'tsing', {
            signed: true
        });
        ctx.body = ctx.cookies.get('name', {
            signed: true
        }) || 'none';
    })
    .get('/unset', (ctx, next) => {
        var r = ctx.cookies.set('name', null);
        ctx.body = r.toString();

    })
    .get('/get', authorize.userAuth(), async(ctx, next) => {
        ctx.body = ctx.cookies.get('name') || 'none';
    })
    .get('/index', async(ctx, next) => {
        await ctx.send(ctx, 'index.html', {
            root: 'static'
        })
    })

export default router;