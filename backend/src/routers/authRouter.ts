import {routerFactory, RouterEntry} from "./util.js"
import {authController} from "../controllers/index.js"

const authRoutes: RouterEntry[] = [
  {
    method: 'post',
    route: '/login/auth',
    controllerFn: authController.loginUser
  },
  {
    method: 'post',
    route: '/reset-password',
    controllerFn: authController.resetPassword
  },
]

export default routerFactory(authRoutes)
