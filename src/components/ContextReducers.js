import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const existingItemIndex = state.findIndex(item => item.id === action.id && item.size === action.size);

    if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity
        return state.map((item, index) => {
            if (index === existingItemIndex) {
                return {
                    ...item,
                    qty:parseInt(action.qty)+parseInt(item.qty),price:(action.price + item.price) // Increment quantity
                };
            } else {
                return item;
            }
        });
    } else {
        // If the item doesn't exist in the cart, add it
        return [
            ...state,
            {
                id: action.id,
                name: action.name,
                qty: action.qty,
                size: action.size,
                price: action.price,
                img: action.img
            }
        ];
    }
            case "REMOVE":
                let newArr =[...state]
                newArr.splice(action.index,1)
                return newArr;
            case "UPDATE":
                let arr = [...state]
                arr.find((food,index) => {
                        if(food.id === action.id){
                            console.log(food.qty,parseInt(action.qty),action.price + food.price)
                            arr[index] = {...food,qty:parseInt(action.qty)+parseInt(food.qty),price:(action.price + food.price)}
                        }
                        return arr;
                })
                return arr;
            case "DROP":
                let emptyArray =[]
                return emptyArray;
        default:
            console.log("Error in Reducer");
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
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

