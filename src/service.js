import { setTickets, setLoading, setError } from './action/action';

export const getData = () => async (dispatch) => {
  const getTickets = (id) => {
    dispatch(setLoading(true));
    return fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${id}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(
          setTickets(
            json.tickets.sort((a, b) => {
              return a.price < b.price ? -1 : 1;
            })
          )
        );
        if (json.stop) {
          getTickets(id);

          return dispatch(setLoading(true));
        }
        return dispatch(setLoading(false));
      })
      .catch(() => {
        return dispatch(setError(true), setLoading(false));
      });
  };

  (() => {
    return fetch('https://front-test.dev.aviasales.ru/search')
      .then((response) => response.json())
      .then((json) => getTickets(json.searchId))
      .catch(() => dispatch(setError(true), setLoading(false)));
  })();
};
