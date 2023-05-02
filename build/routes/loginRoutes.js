"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get(`/`, (req, res) => {
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
router.post(`/`, (req, res, next) => {
    const { email, password } = req.body;
    if (email && password && email === `hi@hi.com` && password === `password`) {
        //mark as logged in
        req.session = { loggedIn: true };
        //redirect to the root route
        res.redirect(`/`);
    }
    else {
        res.send(`Invalid email or password`);
    }
});
router.get(`/protected`, (req, res, next) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        next();
    }
    return res.status(403).send(`Not authorized`);
}, (req, res) => {
    return res.send(`Welcome to the protected route, logged in user!`);
});
exports.default = router;
