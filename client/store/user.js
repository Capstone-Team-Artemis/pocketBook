import axios from 'axios';

// ACTION TYPES
const CHANGED_IMAGE = 'CHANGED_IMAGE';

// ACTION CREATORS
const changedImage = (image) => ({
  type: RECEIVED_IMAGE,
  image,
});

// THUNK CREATORS
export const changeImage = (userId, imageURL) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        {
          image: imageURL,
        }
      );
      // dispatch(changedImage(data));
    } catch (error) {
      console.log('Error saving image to server');
    }
  };
};

// INITIAL STATE
const initialState = {};

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGED_IMAGE:
      return action.image;
    default:
      return state;
  }
}
