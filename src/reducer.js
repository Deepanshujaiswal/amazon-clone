//  export const initialState={
//     basket:[],
//     user:null
// };
// //selector,optional channing
// export const  getBasketTotal= (basket) =>

//  basket?.reduce((amount,item) => item.price+amount,0);

// const reducer=(state,action)=>{
//     console.log(action)
//     switch(action.type){
//         case 'ADD_TO_BASKET':
//             return{
//                 ...state,
//                 basket:[...state.basket,action.item],
//             };

//             case 'REMOVE_FROM_BASKET':
//                 const index=state.basket.findIndex(
//                     (basketItem)=>basketItem.id===action.id

//                 );
//                 let newBasket=[...state.basket];//copy of basket
//                 if(index>=0)
//                 {
//                     newBasket.splice(index,1);//remove the the indexfrom array   
//                 }
//                 else
//                 {
//                     console.warn('cant remove(id: ${action.id}) the product')
//                 }
//                 return {
//                     ...state,
//                     basket:newBasket
//                 };
//                 case 'Empty_Basket':
//                     return{
//                         ...state,
//                         basket:[]
//                     }

//                 case 'SET_USER':
//                     return{
//                         ...state,
//                         user:action.user
//                     };

//         default:
//             return state;

//     }
// }
// export default reducer


export const initialState = {
    basket: [],
    user: null
  };
  
  // Selector
  export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      
      case 'EMPTY_BASKET':
        return {
          ...state,
          basket: []
        }
  
      case "REMOVE_FROM_BASKET":
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
        let newBasket = [...state.basket];
  
        if (index >= 0) {
          newBasket.splice(index, 1);
  
        } else {
          console.warn(
            `Cant remove product (id: ${action.id}) as its not in basket!`
          )
        }
  
        return {
          ...state,
          basket: newBasket
        }
      
      case "SET_USER":
        return {
          ...state,
          user: action.user
        }
  
      default:
        return state;
    }
  };
  
  export default reducer;
  