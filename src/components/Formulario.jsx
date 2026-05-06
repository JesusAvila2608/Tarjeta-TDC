import "./Formulario.css";

function Formulario({
  datos,
  actualizarDato,
  monto,
  actualizarMonto,
  tipo,
  cambiarTipo,
  setMostrarModal,
  autorizado,
  onEnviarSolicitud,
}) {

  const manejarTelefono = (valor) => {
    if (/^\d*$/.test(valor)) {
      actualizarDato("telefono", valor);
    }
  };

  const validarEmail = (correo) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  };

  const validarCurpFormato = (curp) => {
    return /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/.test(curp);
  };

  const validarRFCFormato = (rfc) => {
    return /^[A-ZÑ&]{3,4}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{3}$/.test(rfc);
  };

  const manejarCurp = (valor) => {
    const nuevoValor = valor.toUpperCase();

    if (/^[A-Z0-9]*$/.test(nuevoValor) && nuevoValor.length <= 18) {
      actualizarDato("curp", nuevoValor);
    }
  };

  const manejarRfc = (valor) => {
    const nuevoValor = valor.toUpperCase();

    if (/^[A-ZÑ&0-9]*$/.test(nuevoValor) && nuevoValor.length <= 13) {
      actualizarDato("rfc", nuevoValor);
    }
  };

  const enviarSolicitud = () => {
    if (
      !datos.nombre ||
      !datos.apellido ||
      !validarEmail(datos.email) ||
      !validarCurpFormato(datos.curp) ||
      !validarRFCFormato(datos.rfc) ||
      datos.telefono.length !== 10 ||
      !datos.genero
    ) {
      alert("Completa todos los campos correctamente antes de enviar.");
      return;
    }

    if (!autorizado) {
      setMostrarModal(true);
      return;
    }

    onEnviarSolicitud();
  };

  return (
    <div className="formulario">
      <div className="formulario-contenido">
        <h2>Solicitud de Tarjeta</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={datos.nombre}
          onChange={(e) => actualizarDato("nombre", e.target.value)}
        />

        <input
          type="text"
          placeholder="Apellido"
          value={datos.apellido}
          onChange={(e) => actualizarDato("apellido", e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={datos.email}
          onChange={(e) => actualizarDato("email", e.target.value)}
          className={!validarEmail(datos.email) && datos.email ? "error" : ""}
        />

        {!validarEmail(datos.email) && datos.email && (
          <p className="texto-error">
            Ingresa un correo válido (ejemplo: correo@gmail.com)
          </p>
        )}

        <input
          type="text"
          placeholder="CURP"
          maxLength="18"
          value={datos.curp}
          onChange={(e) => manejarCurp(e.target.value)}
        />

        {datos.curp && !validarCurpFormato(datos.curp) && (
          <p className="texto-error">
            CURP inválida. Debe tener 18 caracteres y el formato correcto.
          </p>
        )}

        <input
          type="text"
          placeholder="RFC"
          maxLength="13"
          value={datos.rfc}
          onChange={(e) => manejarRfc(e.target.value)}
        />

        {datos.rfc && !validarRFCFormato(datos.rfc) && (
          <p className="texto-error">
            RFC inválido. Debe tener 12 o 13 caracteres con formato correcto.
          </p>
        )}

        <h4>Tipo de tarjeta</h4>

        <div className="tipo-tarjeta">
          <button onClick={() => cambiarTipo("Estandar")}>Estándar</button>
          <button onClick={() => cambiarTipo("Gold")}>Gold</button>
          <button onClick={() => cambiarTipo("Platino")}>Platino</button>
        </div>

        {tipo !== "Platino" ? (
          <>
            <h4>Monto de crédito</h4>

            <input
              type="range"
              min={tipo === "Estandar" ? "500" : "25000"}
              max={tipo === "Estandar" ? "25000" : "200000"}
              value={monto}
              onChange={(e) => actualizarMonto(Number(e.target.value))}
            />

            <p>${monto.toLocaleString("es-MX")}</p>
          </>
        ) : (
          <p className="sin-limite">Tarjeta Platino: SIN LIMITE</p>
        )}

        <h4>Teléfono</h4>

        <input
          type="text"
          placeholder="Número de teléfono a 10 dígitos"
          value={datos.telefono}
          maxLength="10"
          onChange={(e) => manejarTelefono(e.target.value)}
          className={datos.telefono && datos.telefono.length !== 10 ? "error" : ""}
        />

        {datos.telefono && datos.telefono.length !== 10 && (
          <p className="texto-error">
            El teléfono debe contener exactamente 10 números.
          </p>
        )}

        <h4>Género</h4>

        <div className={`genero ${datos.genero}`}>
          <label>
            <input
              type="radio"
              name="genero"
              checked={datos.genero === "hombre"}
              onChange={() => actualizarDato("genero", "hombre")}
            />
            Hombre
          </label>

          <label>
            <input
              type="radio"
              name="genero"
              checked={datos.genero === "mujer"}
              onChange={() => actualizarDato("genero", "mujer")}
            />
            Mujer
          </label>

          <label>
            <input
              type="radio"
              name="genero"
              checked={datos.genero === "otro"}
              onChange={() => actualizarDato("genero", "otro")}
            />
            Otro / Prefiero no contestar
          </label>
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            checked={autorizado}
            onChange={() => setMostrarModal(true)}
            readOnly
          />
          <label>
            Acepto que Banco Aureum pueda revisar mi historial crediticio
          </label>
        </div>

        <button className="btn-enviar" onClick={enviarSolicitud}>
          Enviar solicitud
        </button>
      </div>
    </div>
  );
}

export default Formulario;