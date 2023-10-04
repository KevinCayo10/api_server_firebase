const { Router } = require("express");
const doctorController = require("../controllers/doctores.controller");
const router = Router();

router.get("/", doctorController.obtenerDoctores);
router.get("/:id", doctorController.obtenerDoctor);
router.post("/", doctorController.guardarDoctor);

module.exports = router;
