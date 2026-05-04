import "./Card.css";

function Card({
  nombre,
  apellido,
  monto,
  tipo = "Estandar",
  numero = "9759 2484 5269 6576",
  banco = "Banco Aureum",
}) {
  const nombreCompleto = `${nombre || "NOMBRE"} ${apellido || "APELLIDO"}`;

  return (
    <div className="card-area">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className={`flip-card-front ${tipo.toLowerCase()}`}>
            <p className="bank-name">{banco}</p>

            <div className="chip"></div>

            <img src="/logo.png" alt="Logo banco" className="logo-card" />

            <p className="card-number">{numero}</p>

            <p className="card-label">TITULAR</p>
            <p className="card-holder">{nombreCompleto}</p>

            <p className="card-balance-label">CRÉDITO</p>
            <p className="card-balance">
              {typeof monto === "number"
                ? `$${monto.toLocaleString("es-MX")}`
                : monto}
            </p>

            <p className="card-type">{tipo}</p>
          </div>

          <div className={`flip-card-back ${tipo.toLowerCase()}`}>
            <div className="black-strip"></div>
            <div className="signature-strip"></div>
            <div className="security-code">***</div>
            <p className="back-text">
              Esta tarjeta es una simulación para solicitud bancaria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;