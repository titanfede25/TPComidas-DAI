import React, { useContext } from "react";

export const initialState = {
  precioTotal: 0
};

export const ActionTypes = {
  setPrecioTotal: "SET_PRECIOTOTAL"
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.setPrecioTotal: {
      return { ...state, precioTotal: action.newValue };
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

export function ContextProvider({ children, initialState = initialState }) {
  const [contextState, setContextState] = React.useReducer(
    reducer,
    initialState
  );

  return (
    <Context.Provider value={{ contextState, setContextState }}>
      {children}
    </Context.Provider>
  );
}

export const useContextState = () => useContext(Context);
