import { useMachine } from "@xstate/react";
import { Nav } from "../Components/Nav";
import { bookingMachine } from "../machines/bookingMachine";
import "./BaseLayout.css";
import { StepsLayout } from "./StepsLayout";

export const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);

  console.log("nuestro estado", state.value, state.context);

  console.log("nuestra maquina", state.value);

  return (
    <div className="BaseLayout">
      <Nav state={state} send={send} />
      <StepsLayout state={state} send={send} />
    </div>
  );
};
