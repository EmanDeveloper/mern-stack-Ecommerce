import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport"
import LocalStrategy from "passport-local"
import {User} from "./model/user.model.js"

import cors from "cors"

const app = express();

app.use(cors({
  origin:["http://localhost:5174" , "http://localhost:5173"],
  credentials: true  
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "itisfromenv",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax'
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

import productRouter from "./router/Product.routes.js";
import userRouter from "./router/user.routes.js";
import reviewRouter from "./router/review.routes.js"

app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/review",reviewRouter)

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
      status: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  });

export default app;
