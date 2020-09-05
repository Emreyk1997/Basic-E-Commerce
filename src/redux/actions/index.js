let previousId = -1;

export const addItemToBasket = (basketItem) => {
  const id = previousId + 1;
  previousId = id;
  return {
    type: 'add_to_basket',
    payload: { id, basketItem },
  };
};

export const removeItemFromBasket = (id) => {
  return {
    type: 'remove_item_from_basket',
    payload: id,
  };
};

export const changeFilters = (filterArray) => {
  return {
    type: 'change_filters',
    payload: filterArray,
  };
};

export const updateLoadingState = (key) => {
  return {
    type: 'update_loading_state',
    isShowLoading: key,
  };
};
