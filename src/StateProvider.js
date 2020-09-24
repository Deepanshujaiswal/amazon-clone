// import React,{createContext,useContext,useReducer} from 'react'


// //prepare the datelayout
// export const StateContext=createContext();

// //wrap our app 
// export const StateProvider=({
//     reducer,initialState,children})=>(
//         <StateContext.Provider value={useReducer(reducer,
//             initialState)}>
//                 {children}
//             </StateContext.Provider>
//     )

//     //pull information from datalayer
// export const useStateValue=()=>useContext(StateContext);


import React, { createContext, useContext, useReducer } from "react";

// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
