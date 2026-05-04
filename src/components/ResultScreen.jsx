import "./ResultScreen.css";
import Card from "./Card";

function ResultScreen({ datos, tipo, monto, reiniciar }) {
  return (
    <div className="result-screen">
      <div className="result-box">
        <h2>¡Solicitud aprobada!</h2>
        <p>Tu tarjeta Banco Aureum está lista y el monto fue procesado con éxito.</p>

        <div className="result-card-preview">
          <Card
            nombre={datos.nombre}
            apellido={datos.apellido}
            banco="Banco Aureum"
            monto={tipo === "Platino" ? "SIN LIMITE" : monto}
            tipo={tipo}
            numero="9759 2484 5269 6576"
          />
        </div>

        <div className="result-details">
          <p>
            <strong>Tarjeta:</strong> {tipo}
          </p>
          <p>
            <strong>Monto aprobado:</strong>{" "}
            {typeof monto === "number" ? `$${monto.toLocaleString("es-MX")}` : monto}
          </p>
          <p>
            <strong>Titular:</strong> {datos.nombre} {datos.apellido}
          </p>
        </div>

        <button className="btn-enviar" onClick={reiniciar}>
          Iniciar nueva solicitud
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;
