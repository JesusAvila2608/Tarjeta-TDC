import "./App.css";

import { useState } from "react";
import Card from "./components/Card";
import Formulario from "./components/Formulario";
import Modal from "./components/Modal";
import LoadingScreen from "./components/LoadingScreen";
import ResultScreen from "./components/ResultScreen";

function App() {
  const initialDatos = {
    nombre: "",
    apellido: "",
    email: "",
    curp: "",
    rfc: "",
    telefono: "",
    genero: "",
  };

  const [datos, setDatos] = useState(initialDatos);

  const [monto, setMonto] = useState(500);
  const [tipo, setTipo] = useState("Estandar");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [autorizado, setAutorizado] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);

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

  const handleEnviarSolicitud = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSolicitudEnviada(true);
    }, 2200);
  };

  const handleNuevaSolicitud = () => {
    setDatos(initialDatos);
    setMonto(500);
    setTipo("Estandar");
    setAutorizado(false);
    setMostrarRegistro(false);
    setSolicitudEnviada(false);
    setIsLoading(false);
  };

  return (
    <>
      {!mostrarRegistro ? (
        <section className="hero-banco">
          <div className="hero-info">
            <h1>
              Elige la tarjeta de crédito ideal para ti
            </h1>

            <p>
              Banco Aureum te ofrece tres opciones de tarjeta: Estándar, Gold y
              Platino. Inicia tu registro y solicita la que mejor se adapte a
              tus necesidades.
            </p>

            <button onClick={() => setMostrarRegistro(true)}>
              Iniciar registro
            </button>
          </div>

          <div className="hero-preview hero-cards">
<Card
  banco="Banco Aureum"
  nombre="Cliente"
  apellido="Demo"
  monto={25000}
  tipo="Estandar"
  numero="4589 1023 7645 2198"
/>

<Card
  banco="Banco Aureum"
  nombre="Cliente"
  apellido="Demo"
  monto={200000}
  tipo="Gold"
  numero="7321 8845 2096 4412"
/>

<Card
  banco="Banco Aureum"
  nombre="Cliente"
  apellido="Demo"
  monto="SIN LIMITE"
  tipo="Platino"
  numero="9014 5623 7781 3309"
/>
          </div>
        </section>
      ) : isLoading ? (
        <LoadingScreen />
      ) : solicitudEnviada ? (
        <ResultScreen
          datos={datos}
          tipo={tipo}
          monto={tipo === "Platino" ? "SIN LIMITE" : monto}
          reiniciar={handleNuevaSolicitud}
        />
      ) : (
        <div className="container">
          <Card
            nombre={datos.nombre}
            apellido={datos.apellido}
            banco="Banco Aureum"
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
            onEnviarSolicitud={handleEnviarSolicitud}
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
      )}
    </>
  );
}

export default App;