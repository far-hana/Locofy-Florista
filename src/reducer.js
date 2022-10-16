export const initialState = {
    basket: [],
    user: null,
  };
  
  // Selector
  export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "Add-to-Basket":
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
  
      case "Empty-Basket":
        return {
          ...state,
          basket: [],
        };
        
      case "Remove-from-Basket":
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
  
        let newBasket = [...state.basket];
  
        if (index >= 0) {
          newBasket.splice(index, 1);
        } else {
          console.warn(
            `Can't remove the product (id:${action.id}), as it's not in the basket!`
          );
        }
  
        return {
          ...state,
          basket: newBasket,
        };
  
      case "Set-User":
        return {
          ...state,
          user: action.user,
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  