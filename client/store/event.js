// import axios from 'axios';

// //ACTION TYPE

// const CREATE_EVENT = 'CREATE_EVENT';
// const UPDATE_EVENT = 'UPDATE_EVENT';

// //ACTION CREATOR
// const gotEvent = (singleEvent) => ({
//   type: GET_EVENT,
//   singleEvent,
// });
// const createdEvent = (newEvent) => ({
//   type: CREATE_EVENT,
//   newEvent,
// });

// const updatedEvent = (updatedEvent) => ({
//   type: UPDATE_EVENT,
//   updatedEvent,
// });

// //THUNK CREATOE


// //POST api/events/createEvent
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

// //PUT api/events/:userId/updateEvent/:eventId

// export const updateEvent = (userId, editedInfo, eventId) => async (
//   dispatch
// ) => {
//   try {
//     const newEvent = await axios.post(
//       `http://localhost:3000/api/events/${userId}/updateEvent/${eventId}`,
//       editedInfo
//     );
//     dispatch(updatedEvent(newEvent.data));
//   } catch (error) {
//     throw error;
//   }
// };

// // DELETE api/events/delete/eventId
// export const deleteEvent = (userId, eventId) => async (dispatch) => {
//   try {
//     const deletedEvent = await axios.delete(
//       `http://localhost:3000/api/events/${userId}/delete/${eventId}`,
//       editedInfo
//     );
//     console.log('deleted event thunk', deletedEvent);
//   } catch (error) {
//     console.error(error);
//   }
// };

// //INITIAL STATE
// const initialState = [];

// //REDUCER


// export default event;
