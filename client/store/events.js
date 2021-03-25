// ALL EVENTS SUB REDUCER
import axios from 'axios';

// ACTION TYPES
const RECEIVED_EVENTS= 'RECEIVED_EVENTS';

// ACTION CREATORS
const receivedEvents = (events) => ({
  type: RECEIVED_EVENTS,
  events,
});

// THUNK CREATORS
export const fetchEvents = () => {
  return async (dispatch) => {
    try {
      console.log('in try')
      const { data: events } = await axios.get('/api/events');
      console.log('data: ', data)
      dispatch(receivedEvents(events));
    } catch (error) {
        console.log('Error fetching events from server')
    }
  };
};

// INITIAL STATE
const initialState = {
  all: [],
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_EVENTS:
      return {
        ...state, 
        all: action.events
      };
    default:
      return state;
  }
}

export default reducer;