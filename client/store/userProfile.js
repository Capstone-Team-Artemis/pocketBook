import axios from 'axios';

//ACTION TYPE
const GET_USER_PROFILE = 'GET_USER_PROFILE';
const GET_BOOKS = 'GET_BOOKS';

//ACTION CREATORS
const gotUserProfile = (user) => ({
  type: GET_USER_PROFILE,
  user,
});

const gotBooks = (books) => ({
  type: GET_BOOKS,
  books,
});

//THUNK CREATORS
//getting user information
export const getUserProfile = (userId) => async (dispatch) => {
  try {
    const user = await axios.get(`http://localhost:3000/api/users/${userId}`);
    console.log('user profile thunk', user.data);
    dispatch(gotUserProfile(user.data));
  } catch (error) {
    console.error(error);
  }
};

export const getBooks = (userId, status) => async (dispatch) => {
  try {
    console.log('GETBOOKS RAN!!');
    console.log('USERID --->', userId);
    console.log('STATUS --->', status);
    const books = await axios.get(
      `http://localhost:3000/api/users/${userId}/${status}`
    );
    console.log('BOOKSSSS --->', books);
    dispatch(gotBooks(books.data));
  } catch (error) {
    console.error(error);
  }
};

//INITIAL STATE
const initialState = [];

//REDUCER
const userProfile = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return action.user;
    case GET_BOOKS:
      return action.books;
    default:
      return state;
  }
};

export default userProfile;
