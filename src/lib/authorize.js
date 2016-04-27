export default {
    userAuth() {
        return (ctx, next) => {
            if (ctx.cookies.get('name', {signed: true})) {
                next();
            } else {
                ctx.redirect('/login');
            }
        }
    }
};