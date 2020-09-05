export default (state = [], action) => {
  if (action.type === 'change_filters') {
    if (action.payload) {
      return action.payload;
    }
    return state;
  } else {
    return state;
  }
};
