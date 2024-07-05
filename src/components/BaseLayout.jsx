import { useMachine } from "@xstate/react";
import { bookingMachine } from "../machines/bookingMachine";

const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);

  console.log(state);
  console.log(send);
  return (
    <div>
      <h1>Hola</h1>
    </div>
  );
};

export { BaseLayout };
