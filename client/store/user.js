import axios from 'axios';

// ACTION TYPES
const GET_USER = 'GET_USER';

// ACTION CREATORS
const getUser = (user) => ({
  type: GET_USER,
  user,
});

// THUNK CREATORS
export const auth = (
  firstName,
  lastName,
  username,
  email,
  password,
  method
) => async (dispatch) => {
  let res;
  try {
    if (method === 'SignUp') {
      console.log('method -->', method);
      console.log('firstName -->', firstName);
      res = await axios.post('http://localhost:3000/auth/signup/', {
        firstName,
        lastName,
        username,
        email,
        password,
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
