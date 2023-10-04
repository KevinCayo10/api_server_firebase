const express = require("express");
const morgan = require("morgan");
const productoRoute = require("./routes/producto.route");
const doctorRoute = require("./routes/doctores.route");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`port running in http://localhost:${port}`);
});
//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

//Routes
app.use("/api/productos", productoRoute);
app.use("/api/doctores", doctorRoute);

app.get("/", (req, res) => {
  res.send("Server connect");
});
