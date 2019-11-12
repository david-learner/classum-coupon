import express from "express";
import bodyParser from "body-parser";
import path from "path";
import exphbs from "express-handlebars";

// Controllers (route handlers)
import * as indexController from "./controllers/index";
import * as couponController from "./controllers/CouponController";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.engine('handlebars', exphbs());
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", indexController.index);
app.post("/coupons", couponController.createCoupon);
// app.get("/login", userController.getLogin);
// app.post("/login", userController.postLogin);

export default app;
