export const changeTab = (payload) => ({ type: 'CHANGE_TAB', payload });

export const setFilter = (key, value) => ({ type: 'SET_FILTER', key, value });

export const setTickets = (tickets) => ({ type: 'SET_TICKETS', tickets });

export const setLoading = (isLoading) => ({ type: 'SET_LOADING', isLoading });

export const setError = (isError) => ({ type: 'SET_LOADING', isError });

export const getMoreTickets = (payload) => ({
  type: 'GET_MORE_TICKETS',
  payload,
});
