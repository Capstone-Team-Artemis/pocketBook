import axios from 'axios';

// ACTION TYPES
const CHANGED_IMAGE = 'CHANGED_IMAGE';
const FETCHED_USER = 'FETCHED_USER';

// ACTION CREATORS
const fetchedUser = (user) => ({
  type: FETCHED_USER,
  user,
});
const changedImage = (image) => ({
  type: CHANGED_IMAGE,
  image,
});

// THUNK CREATORS
export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/users/${userId}/image`
      );
      dispatch(fetchedUser(data));
    } catch (error) {
      console.log('Error fetching user from server');
    }
  };
};

export const changeImage = (userId, imageURL) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        {
          image: imageURL,
        }
      );
      console.log('CHANGED THE IMAGE -->', data);
      // dispatch(changedImage(data));
    } catch (error) {
      console.log('Error saving image to server');
    }
  };
};

// INITIAL STATE
const initialState = [];

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGED_IMAGE:
      return action.image;
    case FETCHED_USER:
      return action.user;
    default:
      return state;
  }
}
