/* eslint-disable react/prop-types */
import "./Tickets.css";

export const Tickets = ({ send, context }) => {
  const finish = () => {
    send({ type: "FINISH" });
  };

  return (
    <div className="Tickets">
      <p className="Tickets-description description">
        Gracias por volar con book a fly 💚
      </p>
      <div className="Tickets-ticket">
        <div className="Tickets-country">Colombia</div>
        <div className="Tickets-passengers">
          <span>✈</span>
          {context.passengers.map((passenger, idx) => (
            <span key={`passenger-${idx}`}>{passenger}</span>
          ))}
        </div>
      </div>
      <button onClick={finish} className="Tickets-finalizar button">
        Finalizar
      </button>
    </div>
  );
};
