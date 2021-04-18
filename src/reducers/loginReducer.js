import { requestLoginToServer } from '../apis/login';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, user, }
  : { isLoggedIn: false, user: null, };

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload,
    };
  case LOGIN_FAILURE:
  case LOGOUT:
    return {
      ...state,
      isLoggedIn: false,
      user: null,
      message: action.payload,
    };
  default:
    return state;
  }
}

const succeedToLogin = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const failToLogin = (message) => ({
  type: LOGIN_FAILURE,
  payload: message,
});

export const loginToAdminPage = (loginInput) => async (dispatch) => {
  try {
    const response = await requestLoginToServer(loginInput);
    const {
      accessToken,
      user,
    } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(succeedToLogin(user));
  } catch (error) {
    console.error();
  }
};

export default loginReducer;