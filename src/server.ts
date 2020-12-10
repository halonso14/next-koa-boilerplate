import Koa from 'koa';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import next from 'next';
import router from './routes/routes';

// Initialize NextJs instance and expose request handler
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = nextApp.getRequestHandler();

// TODO port number should be 43112 and configured to 43212 via nginx proxy
// https://vks.vatech.co.kr/display/ESDEVELOPER/Port+rules+for+Web+Development
const { PORT = 4000, ISSUER = `http://localhost:${PORT}` } = process.env;

nextApp.prepare().then(() => {
  const app = new Koa();
  app.use(helmet());

  if (process.env.NODE_ENV === 'production') {
    app.proxy = true;
  }

  app.use(async (ctx: any, next: any) => {
    const path = ctx.req.url || '';
    const foundNext = path.search('/_next');
    // https://github.com/vercel/next.js/blob/canary/examples/custom-server-koa/server.js
    ctx.res.statusCode = 200;
    // NOTE foundNext === 6, when '/_next' is found in path
    if (foundNext === 6) {
      // https://github.com/vercel/next.js/issues/5602
      await handler(ctx.req, ctx.res);
    }
    await next();
  });

  app.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  app.use(mount('', router(nextApp).routes()));

  app.listen(PORT, () => {
    console.log(
      `APP is listening on http://localhost:${PORT}/oauth
    );
  });
});
