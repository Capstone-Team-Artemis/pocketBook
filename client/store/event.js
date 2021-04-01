import axios from 'axios';

//ACTION TYPE

const CREATE_EVENT = 'CREATE_EVENT';
//const UPDATE_EVENT = 'UPDATE_EVENT';

const createdEvent = (newEvent) => ({
  type: CREATE_EVENT,
  newEvent,
});

// const updatedEvent = (updatedEvent) => ({
//   type: UPDATE_EVENT,
//   updatedEvent,
// });

//POST api/events/createEvent
export const postEvent = (newEventInfo) => async (dispatch) => {
  try {
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

// export const updateEvent = (userId, eventId, editedInfo) => async (dispatch) => {
//     try {
//         console.log("thunk", userId, eventId, editedInfo)
//         const newEvent = await axios.put(`http://localhost:3000/api/events/${userId}/updateEvent/${eventId}`, editedInfo)
//         dispatch(updatedEvent(newEvent.data))
//     } catch (error) {
//         throw error
//     }
// }

// DELETE api/events/delete/eventId
export const deleteEvent = (userId, eventId) => async (dispatch) => {
    try {
        const deletedEvent = await axios.delete(`http://localhost:3000/api/events/${userId}/delete/${eventId}`)
    } catch (error) {
        console.error(error)
    }
}

//INITIAL STATE
const initialState = [];

//REDUCER   
const event = (state=initialState, action) => {
    switch(action.type){
        default:
            return state
    }
  }
export default event;
