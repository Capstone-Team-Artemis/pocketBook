import axios from 'axios';

// ACTION TYPES
const GET_USER = 'GET_USER';

// ACTION CREATORS
const getUser = (user) => ({
  type: GET_USER,
  user,
});

// THUNK CREATORS
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch {
    console.error(err);
  }
};

export const auth = (
  email,
  password,
  method,
  username,
  firstName,
  lastName
) => async (dispatch) => {
  let res;
  try {
    if (method === 'SignUp') {
      res = await axios.post('http://localhost:3000/auth/signup/', {
        email,
        password,
        username,
        firstName,
        lastName,
      });
      // If method is 'Login':
    } else {
      res = await axios.post('http://localhost:3000/auth/login/', {
        email,
        password,
      });
    }
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    console.log('RES DATA --->', res.data);
    dispatch(getUser(res.data));
  } catch (dispatchErr) {
    console.error(dispatchErr);
  }
};

// INITIAL STATE
const defaultUser = {};

// REDUCER
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
