// ALL EVENTS SUB REDUCER
import axios from 'axios';

// ACTION TYPES
const RECEIVED_EVENTS = 'RECEIVED_EVENTS';

// ACTION CREATORS
const receivedEvents = (events) => ({
  type: RECEIVED_EVENTS,
  events,
});

// THUNK CREATORS
export const fetchEvents = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/events/${userId}`); // this needs to be changed!!
      console.log('DATA: ', data)
      dispatch(receivedEvents(data));
    } catch (error) {
      console.log('Error fetching events from server');
    }
  };
};

// INITIAL STATE
const initialState = {
  all: [],
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_EVENTS:
      return {
        ...state,
        all: action.events,
      };
    default:
      return state;
  }
};

export default reducer;
