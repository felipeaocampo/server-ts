"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use((0, cookie_session_1.default)({ keys: [`adf`] }));
app.use(`/login`, loginRoutes_1.default);
app.get(`/logout`, (req, res) => {
    if (req.session) {
        req.session.loggedIn = false;
    }
    res.redirect(`/`);
});
app.get(`/`, (req, res) => {
    var _a;
    console.log(req.session);
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        res.send(`
      <div>
        <h1>You are logged in</h1>
        <a href="/logout">Lotout</a>
      </div>
    `);
    }
    else {
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
