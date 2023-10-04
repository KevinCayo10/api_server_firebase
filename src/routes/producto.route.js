const { Router } = require("express");
const productoController = require("../controllers/producto.controller");
const router = Router();

router.get("/", productoController.obtenerProductos);
router.get("/:id", productoController.obtenerProducto);
router.post("/", productoController.guardarProducto);
router.put("/:id", productoController.actualizarProducto);
router.delete("/:id", productoController.eliminarProducto);

module.exports = router;
