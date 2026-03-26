import {rateLimit} from "express-rate-limit"
import {Logout} from "../controllers/auth_controller.js"

const limiter = rateLimit({
    windowMs: 5*60*1000,
    limit: 5,
    statusCode: 400,
    message: "you try to exceed the limit",
})

export default limiter