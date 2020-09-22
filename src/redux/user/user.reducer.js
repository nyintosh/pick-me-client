import { userActionTypes } from './user.types'

const INITIAL_STATE = { currentUser: null }

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userActionTypes.SET_CURRENT_USER:
			return {
				currentUser: action.payload,
			}
		case userActionTypes.REMOVE_CURRENT_USER:
			return {
				currentUser: null,
			}
		default:
			return state
	}
}

export default userReducer
