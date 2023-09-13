import React, { useContext } from "react";

export const initialState = {
  precioTotal: 0
};

export const ActionTypes = {
  setPrecioTotalPlus: "SET_PRECIOTOTALPLUS"
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.setPrecioTotalPlus: {
      return { ...state, precioTotal: state.precioTotal + action.newValue };
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
