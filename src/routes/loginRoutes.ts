import { Router, Request, Response } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get(`/`, (req: Request, res: Response) => {
  res.send(`
    <form action="/login" method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});

router.post(`/`, (req: RequestWithBody, res: Response, next) => {
  const { email, password } = req.body;

  if (email && password && email === `hi@hi.com` && password === `password`) {
    //mark as logged in
    req.session = { loggedIn: true };
    //redirect to the root route
    res.redirect(`/`);
  } else {
    res.send(`Invalid email or password`);
  }
});

router.get(
  `/protected`,
  (req, res, next) => {
    if (req.session?.loggedIn) {
      next();
    }

    return res.status(403).send(`Not authorized`);
  },
  (req, res) => {
    return res.send(`Welcome to the protected route, logged in user!`);
  }
);

export default router;
