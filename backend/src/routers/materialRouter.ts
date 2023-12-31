import {routerFactory, RouterEntry} from "./util.js"
import {materialController} from "../controllers/index.js"

const materialRoutes: RouterEntry[] = [
  {
    method: 'post',
    route: '/material',
    controllerFn: materialController.createMaterials,
  },
  {
    method: 'get',
    route: '/material',
    controllerFn: materialController.getMaterials,
  },
  {
    method: 'patch',
    route: '/material/:id',
    controllerFn: materialController.updateMaterial,
  },
]

export default routerFactory(materialRoutes)
