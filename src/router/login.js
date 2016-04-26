import Router from 'koa-router';

const router = new Router({
  prefix: '/login'
})

router
    .get('/', async (ctx, next) => {
        await ctx.render('login', {});
    })
    .post('/', async (ctx, next) => {

        let username = ctx.request.body.username;
        
        await ctx.DBModel.db('db_user').where('username', '=', username)
            .then(result => {
                return result.length>0 ? result : Promise.reject();
            }).then(r => {
                ctx.cookies.set('name', username, {signed: true});
                ctx.redirect('/get');
            }).catch(r => {

                ctx.body = {error: {code: 1, message: '用户不存在！'}};
            });

    })
  

export default router
