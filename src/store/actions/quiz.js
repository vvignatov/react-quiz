import axios from '../../axios/axios-quiz';
import { FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR } from './actionTypes';

export function fetchQuizes() {
	return async(dispatch) => {
		try {
			dispatch(fetchQuizesStart());
			const response = await axios.get('/quizes.json');
			const quizes = [];

			Object.keys(response.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Тест №${index + 1}`
				})
			});

			// this.setState({
			// 	quizes, loading: false
			// })
			dispatch(fetchQuizesSuccess(quizes))
		} catch (error) {
			dispatch(fetchQuizesError(error))
		}
	}
}

export function fetchQuizesStart() {
	return {
		type: FETCH_QUIZ_START
	}
}

export function fetchQuizesSuccess(quizes) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		quizes
	}
}

export function fetchQuizesError(error) {
	return {
		type: FETCH_QUIZ_ERROR,
		error
	}
}