/* eslint-disable no-unused-vars */
import { assign, createMachine } from "xstate";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      on: {
        DONE: "success",
        ERROR: "failure",
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: "",
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
            actions: "imprimirInicio",
          },
        },
      },
      search: {
        entry: "imprimirEntrada",
        exit: "imprimirSalida",
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: ({ event }) => event.selectedCountry,
            }),
          },
          CANCEL: "initial",
        },
        ...fillCountries,
      },
      tickets: {
        on: {
          FINISH: "initial",
        },
      },
      passengers: {
        on: {
          DONE: "tickets",
          CANCEL: {
            target: "initial",
            actions: "cleanContext",
          },
          ADD: {
            actions: assign({
              newPassenger: ({ context, event }) =>
                context.passengers.push(event.newPassenger),
            }),
          },
        },
      },
    },
  },
  {
    actions: {
      imprimirInicio: (context, event) => {
        console.log("Iniciando la compra de boletos de avión");
      },
      imprimirEntrada: (context, event) => {
        console.log("Entrando al estado de búsqueda");
      },
      imprimirSalida: (context, event) => {
        console.log("Saliendo del estado de búsqueda");
      },
      cleanContext: assign({
        selectedCountry: "",
        passengers: [],
      }),
    },
  }
);

export { bookingMachine };
