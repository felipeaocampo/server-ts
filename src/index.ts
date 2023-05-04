import express, { Request, Response } from "express";
import AppRouter from "./AppRouter";
import cookieSession from "cookie-session";

import "./controllers/LoginController";

const app = express();

app.use(express.urlencoded());
app.use(cookieSession({ keys: [`adf`] }));

app.use(AppRouter.getInstance());

app.get(`/logout`, (req, res) => {
  if (req.session) {
    req.session.loggedIn = false;
  }
  res.redirect(`/`);
});

app.get(`/`, (req: Request, res: Response) => {
  console.log(req.session);

  if (req.session?.loggedIn) {
    res.send(`
      <div>
        <h1>You are logged in</h1>
        <a href="/logout">Lotout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <h1>You are not logged in</h1>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
