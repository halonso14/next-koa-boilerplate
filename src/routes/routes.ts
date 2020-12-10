import bodyParser from 'koa-body';
import Router from 'koa-router';

export default (nextApp: any) => {
  const handle = nextApp.getRequestHandler();
  const router = new Router();

  router.get('/interaction/:uid', async (ctx: any, next: any) => {
    const { uid } = ctx.params;
    const account = ctx.query.account || '';
    const prevPassword = ctx.query.prevPassword || '';
    const accountMessage = '';
    const passwordMessage = '';

    await nextApp.render(ctx.req, ctx.res, '/interaction/[uid]', {
      uid,
      account,
      prevPassword,
      accountMessage,
      passwordMessage,
      title: 'Login',
    });
    ctx.respond = false;
  });

  const body = bodyParser({
    text: false,
    json: false,
    patchNode: true,
    patchKoa: true,
  });

  router.post('/interaction/:uid/login', body, async (ctx: any) => {
    const { uid } = ctx.params;
    const { account, password } = ctx.req.body;
    const accountMessage = ctx.req.body.account === 'hello' ? '' : 'Invalid account';
    const passwordMessage = ctx.req.body.password === 'world' ? '' : 'Invalid password';

    if (ctx.req.body.skipLogin && ctx.req.body.skipLogin === 'skip') {
      await nextApp.render(ctx.req, ctx.res, '/main', {});
      ctx.respond = true;
    }

    // TODO check if password will be expired soon or password is already expired.

    if (!accountMessage && !passwordMessage) {
      await nextApp.render(ctx.req, ctx.res, '/main', {});
      ctx.respond = false;
    } else {
      // MEMO redirection will be handled by oidc-provider
      await nextApp.render(ctx.req, ctx.res, '/interaction/[uid]', {
        uid,
        account,
        prevPassword: password,
        accountMessage,
        passwordMessage,
        title: 'Login',
      });
      ctx.respond = false;
    }
  });

  router.get('/interaction/:uid/ChangePassword', async (ctx: any, next: any) => {
    const { uid } = ctx.params;
    const { account, password } = ctx.query;
    const newPassword = ctx.query.newPassword || '';
    const confirmPassword = ctx.query.confirmPassword || '';
    const passwordErrorMessage = ctx.query.passwordErrorMessage || '';

    // TODO password policy check

    await nextApp.render(ctx.req, ctx.res, '/interaction/[uid]/ChangePassword', {
      uid,
      account,
      password,
      newPassword,
      confirmPassword,
      passwordErrorMessage,
      title: 'Change Password',
    });
    ctx.respond = false;
  });

  router.post('/interaction/:uid/ChangePassword', body, async (ctx: any) => {
    const { uid } = ctx.params;
    const { account, password, newPassword, confirmPassword } = ctx.req.body;
    let passwordErrorMessage;
    let isValidPassword;

    // TODO check if password will be expired soon or password is already expired.
    if (newPassword === confirmPassword) {
      isValidPassword = true;
      passwordErrorMessage = '';
    } else {
      isValidPassword = false;
      passwordErrorMessage = 'Invalid Password.';
    }

    if (isValidPassword) {
      await nextApp.render(ctx.req, ctx.res, '/interaction/[uid]/PasswordChanged', {
        uid,
        account,
      });
      ctx.respond = false;
    } else {
      await nextApp.render(ctx.req, ctx.res, '/interaction/[uid]/ChangePassword', {
        uid,
        account,
        password,
        newPassword,
        confirmPassword,
        passwordErrorMessage,
        title: 'Change Password',
      });
      ctx.respond = false;
    }
  });

  router.get('/session/:end', async (ctx: any, next: any) => {
    const { account } = ctx.oidc.session;
    if (account) {
      const { state } = ctx.query;
      const { secret } = ctx.oidc.session.state;
      await nextApp.render(ctx.req, ctx.res, '/session/end', {
        // TODO get secret from state
        xsrf: secret,
      });
      ctx.respond = false;
    }
    return next();
  });

  router.get('/', async (ctx: any, next: any) => {
    await nextApp.render(ctx.req, ctx.res, '/main', {});
    ctx.respond = false;
    return next();
  });

  router.get('/error', (ctx: any) => {
    return nextApp.render(ctx.req, ctx.res, '/errorPage', ctx.query);
  });

  router.all('(.*)', async (ctx: any) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  return router;
};
