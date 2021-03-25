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
    if (method === 'signup') {
      res = await axios.post(`/auth/${method}`, {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      // If method is 'login':
    } else {
      res = await axios.post(`/auth/${method}`, {
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
