export default (state = [], action) => {
  if (action.type === 'add_to_basket') {
    if (state) {
      let sameProduct = false;
      let quantity = 1;
      state.map((item, index) => {
        if (item.basketItem.id === action.payload.basketItem.id) {
          state[index].quantity = state[index].quantity + 1;
          sameProduct = true;
        }
      });
      if (sameProduct) {
        return [...state];
      }
      state = state.slice();
      state.push({ ...action.payload, quantity });
      return [...state];
    }
    return [action.payload];
  } else if (action.type === 'remove_item_from_basket') {
    let newArr = state.filter((item) => item.id !== action.payload);
    return newArr;
  } else {
    return state;
  }
};
