import { useState } from "react";
import initialState from '../initialState'

const useInitialState = () => {
    const [state, setState] = useState(initialState);
   
    const addToCart = payload => {
        setState({
            ...state,
            cart: [...state.cart, payload]
        })
    };

    const addToBuyer = payload => {
        setState({
          ...state,
          buyer: [ ...state.buyer, payload]
        })
      }

    return {
        addToCart,
        addToBuyer,
        state
    }
}

export default useInitialState;