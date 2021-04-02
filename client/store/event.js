// import axios from 'axios';

//ACTION TYPE

// const CREATE_EVENT = 'CREATE_EVENT';
// //const UPDATE_EVENT = 'UPDATE_EVENT';

// const createdEvent = (newEvent) => ({
//   type: CREATE_EVENT,
//   newEvent,
// });

<<<<<<< HEAD
const updatedEvent = (updatedEvent) => ({
  type: UPDATE_EVENT,
  updatedEvent,
});

//THUNK CREATOR
//GET api/events/eventId
export const getSingleEvent = (eventId) => async (dispatch) => {
  try {
    const singleEvent = await axios.get(
      `https://pocketbook-gh.herokuapp.com/api/events/${eventId}`
    );
    dispatch(gotEvent(singleEvent.data));
  } catch (error) {
    console.error(error);
  }
};

//POST api/events/createEvent
export const postEvent = (newEventInfo) => async (dispatch) => {
  try {
    const newEvent = await axios.post(
      `https://pocketbook-gh.herokuapp.com/api/events/createEvent`,
      newEventInfo
    );
    dispatch(createdEvent(newEvent.data));
  } catch (error) {
    throw error;
  }
};

//PUT api/events/:userId/updateEvent/:eventId

export const updateEvent = (userId, editedInfo, eventId) => async (
  dispatch
) => {
  try {
    const newEvent = await axios.post(
      `https://pocketbook-gh.herokuapp.com/api/events/${userId}/updateEvent/${eventId}`,
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
      `https://pocketbook-gh.herokuapp.com/api/events/${userId}/delete/${eventId}`,
      editedInfo
    );
    console.log('deleted event thunk', deletedEvent);
  } catch (error) {
    console.error(error);
  }
};
=======
// const updatedEvent = (updatedEvent) => ({
//   type: UPDATE_EVENT,
//   updatedEvent,
// });

//POST api/events/createEvent
// export const postEvent = (newEventInfo) => async (dispatch) => {
//   try {
//     const newEvent = await axios.post(
//       `http://localhost:3000/api/events/createEvent`,
//       newEventInfo
//     );
//     dispatch(createdEvent(newEvent.data));
//   } catch (error) {
//     throw error;
//   }
// };

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
// export const deleteEvent = (userId, eventId) => async (dispatch) => {
//     try {
//         const deletedEvent = await axios.delete(`http://localhost:3000/api/events/${userId}/delete/${eventId}`)
//     } catch (error) {
//         console.error(error)
//     }
// }
>>>>>>> 9cb7183ab34ef97c53468110789005345c9753b6

//INITIAL STATE
// const initialState = [];

// //REDUCER   
// const event = (state=initialState, action) => {
//     switch(action.type){
//         default:
//             return state
//     }
//   }

// export default event;