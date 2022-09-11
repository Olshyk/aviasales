const initialState = {
  stops: {
    all: true,
    without: true,
    one: true,
    two: true,
    three: true,
  },
};

const filterReducer = (state = initialState, action) => {
  if (action.type === 'SET_FILTER') {
    if (action.key === 'all' && action.value) {
      return {
        ...state,
        stops: {
          all: action.value,
          without: true,
          one: true,
          two: true,
          three: true,
        },
      };
    }
    if (action.key === 'all' && !action.value) {
      return {
        ...state,
        stops: {
          all: action.value,
          without: false,
          one: false,
          two: false,
          three: false,
        },
      };
    }
    if (
      (action.value && state.stops.one && state.stops.two && state.stops.three) ||
      (action.value && state.stops.without && state.stops.two && state.stops.three) ||
      (action.value && state.stops.without && state.stops.one && state.stops.three) ||
      (action.value && state.stops.without && state.stops.one && state.stops.two)
    ) {
      return {
        ...state,
        stops: {
          ...state.stops,
          all: true,
          [action.key]: action.value,
        },
      };
    }
    return {
      ...state,
      stops: {
        ...state.stops,
        all: false,
        [action.key]: action.value,
      },
    };
  }
  return state;
};

export default filterReducer;
