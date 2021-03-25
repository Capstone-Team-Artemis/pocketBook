import axios from 'axios';

//ACTION TYPE
const GET_USER_PROFILE = 'GET_USER_PROFILE'

//ACTION CREATORS
const gotUserProfile = (user) => ({
    type: GET_USER_PROFILE,
    user
})

//THUNK CREATORS
//getting user information 
const getUserProfile = (userId) => async (dispatch) =>{
    try {
        const user = await axios.get(`/api/users/${userId}`)
        console.log("user profile thunk", user.data)
        dispatch(gotUserProfile(user.data))
    } catch (error) {
        console.error(error)
    }
}


//INITIAL STATE
const initialState = []

//REDUCER
const userProfile = (state=initialState, action) => {
    switch(action.type) {
        case GET_USER_PROFILE:
            return action.user
        default:
            return state
    }
}

export default userProfile
