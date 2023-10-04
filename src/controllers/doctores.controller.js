const { db } = require("./../config/firebase");

const obtenerDoctores = async (req, res) => {
  const querySnapshot = await db.collection("doctores").get();
  //LLenamos doctores con los objetos (documentos)
  const doctores = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    //Trae todos los campos
    ...doc.data(),
  }));
  //console.log(doctores);
  res.send(doctores);
};

const obtenerDoctor = async (req, res) => {
  try {
    const msp = req.params.msp; // Obtener el valor de "msp" de los parámetros de la solicitud

    const querySnapshot = await db
      .collection("doctores")
      .where("msp", "==", msp) // Filtrar por el campo "msp" igual al valor proporcionado
      .get();

    if (querySnapshot.empty) {
      res.status(404).send("Médico no encontrado");
      return;
    }

    // Obtener el primer médico que coincida (debería ser único por "msp")
    const doctor = querySnapshot.docs[0].data();
    res.send(doctor);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const guardarDoctor = async (req, res) => {
  const {
    nombres,
    apellidos,
    direccion,
    ciudad,
    pais,
    email,
    telefono,
    cedula,
    hospital_trabajo,
    institucion,
    titulo,
    especialidad,
    fecha_grado,
  } = req.body;

  const doctor = {
    nombres,
    apellidos,
    direccion,
    ciudad,
    pais,
    email,
    telefono,
    cedula,
    hospital_trabajo,
    institucion,
    titulo,
    especialidad,
    fecha_grado,
  };

  // Guardar el doctor en la base de datos
  await db.collection("doctores").add(doctor);

  res.send("Médico guardado exitosamente");
};

module.exports = {
  obtenerDoctores,
  obtenerDoctor,
  guardarDoctor,
};
