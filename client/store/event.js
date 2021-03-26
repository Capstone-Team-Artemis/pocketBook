import axios from 'axios';

//ACTION TYPE
const CREATE_EVENT = 'CREATE_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';

//ACTION CREATOR
const createdEvent = (newEvent) => ({
  type: CREATE_EVENT,
  newEvent,
});

const updatedEvent = (updatedEvent) => ({
  type: UPDATE_EVENT,
  updatedEvent,
});

//THUNK CREATOR
//POST api/events/createEvent
export const postEvent = (newEventInfo) => async (dispatch) => {
  try {
    console.log('post creator', newEventInfo);
    const newEvent = await axios.post(
      `http://localhost:3000/api/events/createEvent`,
      newEventInfo
    );
    console.log('newEvent', newEvent.data);
    dispatch(createdEvent(newEvent.data));
  } catch (error) {
    console.log(error);
  }
};

//INITIAL STATE
const initialState = [];

//REDUCER
const event = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return action.newEvent;
    default:
      return state;
  }
};

export default event;
