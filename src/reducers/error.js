const ERROR_OCCURRED = 'ERROR_OCCURRED';
const ERROR_SETTLED = 'ERROR_SETTLED';

export const errorOccurred = (message, link) => ({
  type: ERROR_OCCURRED,
  payload: {
    message,
    link,
  },
});

export const errorSettled = () => ({
  type: ERROR_SETTLED,
});

const initialState = {
  display: false,
  message: '',
  link: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_OCCURRED: {
      return {
        ...state,
        display: true,
        message: action.payload.message,
        link: action.payload.link,
      };
    }
    case ERROR_SETTLED: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
}
