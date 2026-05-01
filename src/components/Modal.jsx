import "./Modal.css";

function Modal({ cerrar, autorizar, declinar }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Autorización de historial crediticio</h2>

        <p>
          Al autorizar esta revisión, permites que Banco X consulte tu historial
          crediticio con la finalidad de evaluar tu solicitud de tarjeta de
          crédito. Esta información será utilizada únicamente para determinar la
          viabilidad del trámite.
        </p>

        <p>
          Puedes autorizar la consulta o declinarla. Si decides no autorizar,
          el banco no podrá continuar con la evaluación de la solicitud.
        </p>

        <div className="modal-buttons">
          <button onClick={autorizar}>Autorizar</button>
          <button onClick={declinar}>Declinar</button>
        </div>

        <button className="btn-cerrar" onClick={cerrar}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;