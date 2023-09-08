import React, { useContext } from "react";

export const initialState = {
  precioTotal: 0
};

export const ActionTypes = {
  setPrecioTotalPlus: "SET_PRECIOTOTALPLUS"
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.setPrecioTotalPlus: {
      return { ...state, precioTotal: (state.precioTotal??0) + action.newValue };
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
