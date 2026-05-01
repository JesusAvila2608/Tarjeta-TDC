import { useState } from "react";
import Card from "./components/Card";
import Formulario from "./components/Formulario";
import Modal from "./components/Modal";

function App() {
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    email: "",
    curp: "",
    rfc: "",
    telefono: "",
    genero: "",
  });

  const [monto, setMonto] = useState(500);
  const [tipo, setTipo] = useState("Estandar");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [autorizado, setAutorizado] = useState(false);

  const actualizarDato = (campo, valor) => {
    setDatos({
      ...datos,
      [campo]: valor,
    });
  };

  const actualizarMonto = (valor) => {
    setMonto(valor);

    if (valor <= 25000) {
      setTipo("Estandar");
    } else {
      setTipo("Gold");
    }
  };

  const cambiarTipo = (nuevoTipo) => {
    setTipo(nuevoTipo);

    if (nuevoTipo === "Estandar") {
      setMonto(500);
    }

    if (nuevoTipo === "Gold") {
      setMonto(25000);
    }
  };

  return (
    <div className="container">
      <Card
        nombre={datos.nombre}
        apellido={datos.apellido}
        monto={tipo === "Platino" ? "SIN LIMITE" : monto}
        tipo={tipo}
      />

      <Formulario
        datos={datos}
        actualizarDato={actualizarDato}
        monto={monto}
        actualizarMonto={actualizarMonto}
        tipo={tipo}
        cambiarTipo={cambiarTipo}
        setMostrarModal={setMostrarModal}
        autorizado={autorizado}
      />

      {mostrarModal && (
        <Modal
          cerrar={() => setMostrarModal(false)}
          autorizar={() => {
            setAutorizado(true);
            setMostrarModal(false);
          }}
          declinar={() => {
            setAutorizado(false);
            setMostrarModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;