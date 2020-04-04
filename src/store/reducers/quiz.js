import { FETCH_QUIZ_START, FETCH_QUIZ_ERROR, FETCH_QUIZ_SUCCESS } from "../actions/actionTypes";

const initialState = {
	quizes: [],
	loading: false,
	error: null
}

export default function quizReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_QUIZ_START:
			return {
				...state, loading: true
			}
		case FETCH_QUIZ_ERROR:
			return {
				...state, loading: false
			}
		case FETCH_QUIZ_SUCCESS:
			return {
				...state, loading: false, quizes: action.quizes, error: action.error
			}
		default:
			return state;
	}
} 