// ACTION TYPES
const GET_TOKEN = 'GET_TOKEN';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SIGNUP = 'SIGNUP';

// INITIAL STATE
export const initialLoginState = {
  isLoading: true,
  userId: null,
  userToken: null,
};

// ACTION CREATORS
const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

const signIn = (id, token) => ({
  type: LOGIN,
  id,
  token,
});

const signOut = () => ({
  type: LOGOUT,
});

const register = (id, token) => ({
  type: SIGNUP,
  id,
  token,
});

// REDUCER
export default function loginReducer(state = initialLoginState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...initialLoginState,
        userToken: action.token,
        isLoading: false,
      };
    case LOGIN:
      return {
        ...initialLoginState,
        userId: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...initialLoginState,
        userId: null,
        userToken: null,
        isLoading: false,
      };
    case SIGNUP:
      return {
        ...initialLoginState,
        userId: action.id,
        userToken: action.token,
        isLoading: false,
      };
    default:
      return state;
  }
}
