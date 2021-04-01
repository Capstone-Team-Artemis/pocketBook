// ALL EVENTS SUB REDUCER
import axios from 'axios';

// ACTION TYPES
const RECEIVED_EVENTS = 'RECEIVED_EVENTS';
const CREATED_EVENT = 'CREATED_EVENT';
const UPDATED_EVENT = 'UPDATED_EVENT';
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

const updatedEvent = (updatedEvent) => ({
  type: UPDATED_EVENT,
  updatedEvent,
});

const deletedEvents = (deletedEvent) => ({
  type: DELETED_EVENT,
  deletedEvent,
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
    dispatch(createdEvent(newEvent.data));
  } catch (error) {
    throw error;
  }
};

//PUT api/events/:userId/updateEvent/:eventId
export const updateEvent = (userId, eventId, editedInfo) => async (
  dispatch
) => {
  try {
    const newEvent = await axios.put(
      `http://localhost:3000/api/events/${userId}/updateEvent/${eventId}`,
      editedInfo
    );
    dispatch(updatedEvent(newEvent.data));
  } catch (error) {
    throw error;
  }
};

// DELETE api/events/delete/eventId
export const deleteEvent = (userId, eventId) => async (dispatch) => {
  try {
    const deletedEvent = await axios.delete(
      `http://localhost:3000/api/events/${userId}/delete/${eventId}`);
    dispatch(deletedEvents(deletedEvent.data));
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
    case CREATED_EVENT:
      console.log('in created event reducer!')
      console.log('RETURN VALUE OF REDUCER:',{
        ...state,
        all: [...state.all, action.newEvent]
      })
      return {
        ...state,
        all: [...state.all, ...action.newEvent]
      }
    case UPDATED_EVENT:
      return {
        ...state, 
        all: [...state.all].map((event) => {
          return event.id === action.updatedEvent.id ? 
          action.updatedEvent : event
        })
      };
    case DELETED_EVENT:
      return {
        ...state, 
        all: [...state.all].filter((event) => {
          return event.id !== action.deletedEvent.id
      })
    }
    default:
      return state;
  }
};

export default reducer;
