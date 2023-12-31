import {routerFactory, RouterEntry} from "./util.js"
import {userController} from "../controllers/index.js"

const userRoutes: RouterEntry[] = [
  {
    method: 'post',
    route: '/companies/:id/user',
    controllerFn: userController.createUser
  },
  {
    method: 'patch',
    route: '/password',
    controllerFn: userController.updatePassword
  },
  {
    method: 'get',
    route: '/project/:project_id/users',
    controllerFn: userController.getProjectUsers
  },
  {
    method: 'get',
    route: '/project/:project_id/clients',
    controllerFn: userController.getProjectClients
  },
  {
    method: 'post',
    route: '/project/:project_id/users',
    controllerFn: userController.addProjectUser
  },
  {
    method: 'get',
    route: '/companies/:id/users',
    controllerFn: userController.getCompanyUsers
  },
  {
    method: 'get',
    route: '/project/:project_id/users_not_in_project',
    controllerFn: userController.getCompanyUsersNotInProject
  },
]

export default routerFactory(userRoutes)
