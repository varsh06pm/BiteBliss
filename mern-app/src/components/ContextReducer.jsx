import React, { createContext ,useContext,useReducer} from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

// logic of add to cart functionality is added in reducer snippet
const reducer = (state, action) => {
  switch(action.type){
    case "ADD": 
        return [...state,{
            id: action.id, name:action.name, qty:action.qty, 
            size: action.size, price: action.price, img: action.img
        }]
    case "REMOVE": 
        let newArr = [...state]
        newArr.splice(action.index, 1)
        return newArr;
    case "UPDATE":
        let arr = [...state]
        arr.find((food, index)=> {
          if(food.id === action.id){
            console.log(food.qty,parseInt(action.qty),action.price + food.price)
            arr[index] = {...food, qty: parseInt(action.qty) + food.qty,price: action.price + food.price}
          }
          return arr
        })
        return arr
    default:
        console.log("Error in Reducer");
  }
}

export const CartProvider = ({ children }) => {
  // If you find yourself keeping track of multiple pieces of state that
  // rely on complex logic, useReducer may be useful.
  const [state, dispatch] = useReducer(reducer, []) // initially it's an empty array as the cart is empty in the beginning
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
