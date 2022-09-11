const initialState = {
  ticketsList: [],
  isLoading: false,
  isError: false,
  ticketsAmmount: 10,
};

const ticketReducer = (state = initialState, action) => {
  if (action.type === 'SET_TICKETS') {
    return {
      ...state,
      ticketsList: action.tickets,
    };
  }
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }
  if (action.type === 'SET_ERROR') {
    return {
      ...state,
      isError: action.isError,
    };
  }
  if (action.type === 'GET_MORE_TICKETS') {
    return {
      ...state,
      ticketsAmmount: action.payload,
    };
  }
  return state;
};

export default ticketReducer;
