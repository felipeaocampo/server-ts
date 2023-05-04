import { Router, Request, Response } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

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
