import { Router, Request, Response, NextFunction } from "express";
import { get } from "./decorators/routes";
import { controller } from "./decorators/controller";
import { use } from "./decorators/use";
import { bodyValidator } from "./decorators/bodyValidator";
import { post } from "./decorators/routes";

function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`middleware fired!`);
  next();
}

@controller(`/login`)
class LoginController {
  @get(`/`)
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form action="/login" method="post">
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
  }

  @post(`/`)
  @bodyValidator(`email`, `password`)
  postLogin(req: Request, res: Response): void {
    console.log(`MAKING IT TO THE END!`);
    const { email, password } = req.body;

    if (email && password && email === `hi@hi.com` && password === `password`) {
      //mark as logged in
      req.session = { loggedIn: true };
      //redirect to the root route
      res.redirect(`/`);
    } else {
      res.send(`Invalid email or password`);
    }
  }
}
