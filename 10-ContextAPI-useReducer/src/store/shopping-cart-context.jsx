import {createContext, useReducer} from "react";
import {DUMMY_PRODUCTS} from "../dummy-products.js";

// Context 기본값. 값을 Provider로 제공받지 않았을 때 사용. 편집기에서 내부 구조를 알 수 있어, 코딩속도 향상.
export const CartContext = createContext({
    items: [],
    addItemToCart: () =>  {},
    updateItemQuantity : ()=> {},
});

//밖에 만들어야 앞의 함수가 실행될때마다 재생성되지 않음.
// 또한 아래의 함수에서 값의 정의나, 업데이트에 있어 필요로 하지 않기 때문
function shoppingCartReducer(state, action){
    if(action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            updatedItems[existingCartItemIndex] = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state,
            items: updatedItems,
        };
    }
    if(action.type === 'UPDATE_ITEM'){
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    return state;

}




export default function CartContextProvider({children}){
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer);

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id,
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type : "UPDATE_ITEM",
            payload : {
                 productId,
                 amount,
            }
        })
    }

    const ctxValue = {
        items : shoppingCartState.items,
        addItemToCart : handleAddItemToCart,
        updateItemQuantity : handleUpdateCartItemQuantity,
    }


    return <CartContext.Provider value = {ctxValue}>
        {children}
    </CartContext.Provider>
}