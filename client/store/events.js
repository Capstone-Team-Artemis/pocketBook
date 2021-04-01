// ALL EVENTS SUB REDUCER
import axios from 'axios';

// ACTION TYPES
const RECEIVED_EVENTS = 'RECEIVED_EVENTS';
const CREATED_EVENT = 'CREATED_EVENT';
const DELETED_EVENT = 'DELETED_EVENT';

// ACTION CREATORS
const receivedEvents = (events) => ({
  type: RECEIVED_EVENTS,
  events,
});

const createdEvent = (newEvent) => ({
  type: CREATED_EVENT,
  newEvent,
});

const deletedEvents = (userId, eventId) => ({
  type: DELETED_EVENT,
  userId, 
  eventId
});

// THUNK CREATORS

export const fetchEvents = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/events/${userId}`
      ); // this needs to be changed to reflect ngrok!!
      dispatch(receivedEvents(data));
    } catch (error) {
      console.log('Error fetching events from server');
    }
  };
};

//POST api/events/createEvent
export const postEvent = (newEventInfo) => async (dispatch) => {
  try {
    console.log('in create events thunk!')
    const newEvent = await axios.post(
      `http://localhost:3000/api/events/createEvent`,
      newEventInfo
    );
    console.log('new event: ', newEvent.data)
    dispatch(createdEvent(newEvent.data));
  } catch (error) {
    throw error;
  }
};

//DELETE api/events/delete/eventId
export const deleteEvent = (userId, eventId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:3000/api/events/${userId}/delete/${eventId}`);
      dispatch(deletedEvents(userId, eventId));
      //console.log('action creator: ', deletedEvents(userId, eventId));
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
      }
    case CREATED_EVENT:
      return {
        ...state,
        all: [...state.all, action.newEvent]
      }
    case DELETED_EVENT:
      return {
        ...state,
        all: state.all.filter((event) => {
          return event.id !== action.eventId;
      })}
    default:
      return state;
  }
};

export default reducer;
