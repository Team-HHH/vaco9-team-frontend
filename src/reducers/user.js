import { requestLoginToServer } from '../apis/login';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const succeedToLogin = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const failToLogin = (message) => ({
  type: LOGIN_FAILURE,
  payload: message,
});

export const loginToAdminPage = (loginInput, history) => async (dispatch) => {
  try {
    const response = await requestLoginToServer(loginInput);
    const body = await response.json();
    const {
      accessToken,
      user,
    } = body.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(succeedToLogin(user));

    history.push('/');
  } catch (error) {
    console.error();
  }
};

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { isLoggedIn: true, info: user, }
  : { isLoggedIn: false, info: null, };

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return {
      ...state,
      isLoggedIn: true,
      info: action.payload,
    };
  case LOGIN_FAILURE:
  case LOGOUT:
    return {
      ...state,
      isLoggedIn: false,
      info: null,
      message: action.payload,
    };
  default:
    return state;
  }
}
