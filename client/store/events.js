// ALL EVENTS SUB REDUCER
import axios from 'axios';

// ACTION TYPES
const RECEIVED_EVENTS = 'RECEIVED_EVENTS';
const DELETED_EVENT = 'DELETED_EVENT';

// ACTION CREATORS
const receivedEvents = (events) => ({
  type: RECEIVED_EVENTS,
  events,
});

const deletedEvents = (userId, eventId) => ({
  type: DELETED_EVENT,
  userId,
  eventId,
});

// THUNK CREATORS

// GET api/events/ -> get ALL events
export const fetchEvents = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://pocketbook-gh.herokuapp.com/api/events/${userId}`
      );
      dispatch(receivedEvents(data));
    } catch (error) {
      console.log('Error fetching events from server');
    }
  };
};

//POST api/events/createEvent
export const postEvent = (newEventInfo) => async (dispatch) => {
  try {
    // makes the API call to create the event in the Event model and the attendee entry (row) for the event in the userEvent model
    const newEvent = await axios.post(
      `http://localhost:3000/api/events/createEvent`,
      newEventInfo
    );
    // makes the API call to get ALL the events and perform left join to include the attendee's info who is logged in
    const { data } = await axios.get(
      `http://localhost:3000/api/events/${userId}`
    );
    // this updates the store state w/the new data and triggers re-rendering of the DOM
    dispatch(receivedEvents(data));
  } catch (error) {
    throw error;
  }
};

//DELETE api/events/delete/eventId
export const deleteEvent = (userId, eventId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:3000/api/events/${userId}/delete/${eventId}`
    );
    dispatch(deletedEvents(userId, eventId));
  } catch (error) {
    console.error(error);
  }
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
    case DELETED_EVENT:
      return {
        ...state,
        all: state.all.filter((event) => {
          return event.id !== action.eventId;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
