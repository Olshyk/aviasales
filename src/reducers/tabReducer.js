const initialState = 'cheapest';

const tabReducer = (state = initialState, action) => {
  if (action.type === 'CHANGE_TAB') {
    const newState = action.payload;
    return newState;
  }
  return state;
};

export default tabReducer;
