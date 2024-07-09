/* eslint-disable no-unused-vars */
import { assign, createMachine, fromPromise } from "xstate";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      on: {
        invoke: {
          id: "getCountries",
          src: fromPromise(() =>
            fetch("https://restcountries.com/v3.1/region/ame").then((response) =>
              response.json()
            )
          ),
          onDone: {
            target: "success",
            actions: assign({ countries: ({ event }) => event.data }),
          },
          onError: {
            target: "failure",
            actions: assign({ error: "fallo el request" }),
          },
        },
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
      countries: [],
      error: "",
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
        after: {
          5000: {
            target: "initial",
            actions: "cleanContext",
          },
        },
        on: {
          FINISH: "initial",
        },
      },
      passengers: {
        on: {
          DONE: {
            target: "tickets",
            guard: "moreThanOnePassenger",
          },
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
    guards: {
      moreThanOnePassenger: (context, event) => {
        return context.passengers.length > 0;
      },
    },
  }
);

export { bookingMachine };
