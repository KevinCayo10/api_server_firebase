const { db } = require("./../config/firebase");

const obtenerProductos = async (req, res) => {
  const querySnapshot = await db.collection("productos").get();
  //LLenamos productos con los objetos (documentos)
  const productos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    //Trae todos los campos
    ...doc.data(),
  }));
  //console.log(productos);
  res.send(productos);
};

const guardarProducto = async (req, res) => {
  const { producto, descripcion, stock, precio } = req.body;
  const product = { producto, descripcion, stock, precio };
  await db.collection("productos").add(product);

  //console.log(producto, descripcion, stock, precio);
  res.send("Guadado Producto");
};

const actualizarProducto = async (req, res) => {
  try {
    //req.params.id -> ID por URL
    //req.body -> Todo el cuerpo en JSON

    await db.collection("productos").doc(req.params.id).update(req.body);

    res.send("Actualizar Producto");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const obtenerProducto = async (req, res) => {
  try {
    const querySnapshot = await db
      .collection("productos")
      .doc(req.params.id)
      .get();

    const producto = {
      id: querySnapshot.id,
      ...querySnapshot.data(),
    };
    res.send(producto);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const eliminarProducto = async (req, res) => {
  try {
    console.log(req.params.id);
    await db.collection("productos").doc(req.params.id).delete();
    res.send("Eliminado Producto");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
module.exports = {
  obtenerProductos,
  guardarProducto,
  actualizarProducto,
  obtenerProducto,
  eliminarProducto,
};
