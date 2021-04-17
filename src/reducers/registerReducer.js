const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

const registerInitialState = {
  isRegistering: false,
  isError: false,
};

export function registerReducer(state = registerInitialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state };
    case REGISTER_SUCCESS:
      return { ...state };
    case REGISTER_FAILURE:
      return { ...state };
    default:
      return state;
  }
}
