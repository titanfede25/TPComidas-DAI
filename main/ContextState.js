import React, { useContext } from "react";

export const initialState = {
  precioTotal: 0,
  token: "",
  healthScore: 0,
  cantPlatos: 0,
  cantPlatosVeganos: 0,
  cantPlatosNoVegano: 0
};

export const ActionTypes = {
  setPrecioTotalPLUS: "SET_PRECIOTOTALPLUS",
  //setPrecioTotalMINUS: "SET_PRECIOTOTALMINUS",
  setToken: "SET_TOKEN",
  setCantPlatosPLUS: "SET_PLATOS",
  setCantPlatosVeganosPLUS: "SET_CANTPLATOSVEGANOS",
  setCantPlatosNoVeganosPLUS: "SET_CANTPLATOSNOVEGANOS"
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.setPrecioTotalPLUS: {
      return { ...state, precioTotal: state.precioTotal + action.newValue };
    }
    /*case ActionTypes.setPrecioTotalMINUS: {
      return { ...state, precioTotal: state.precioTotal + action.newValue };
    }*/
    case ActionTypes.setToken: {
      return { ...state, token: action.newValue };
    }
    case ActionTypes.setCantPlatosPLUS: {
      return { ...state, cantPlatos: state.cantPlatos + action.newValue };
    }
    case ActionTypes.setCantPlatosVeganosPLUS: {
      return { ...state, cantPlatosVeganos: state.cantPlatosVeganos + action.newValue };
    }
    case ActionTypes.setCantPlatosNoVeganosPLUS: {
      return { ...state, cantPlatosNoVeganos: state.cantPlatosNoVeganos + action.newValue };
    }
    default: {
      return state;
    }
  }
};

export const initialContext = {
  contextState: initialState,
  setContextState: () => {},
};

const Context = React.createContext(initialContext);

export function ContextProvider({ children, state = initialState }) {
  const [contextState, setContextState] = React.useReducer(
    reducer,
    state
  );

  return (
    <Context.Provider value={{ contextState, setContextState }}>
      {children}
    </Context.Provider>
  );
}

export const useContextState = () => useContext(Context);
