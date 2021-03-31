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
  } catch (err) {
    console.error(err);
  }
};

// INITIAL STATE
const defaultUser = {};

// REDUCER
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      console.log('ACTION.USER --->', action.user);
      return action.user;
    default:
      return state;
  }
}
