import React from 'react';
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/Ui/Loader/Loader';

class Quiz extends React.Component {
	state = {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		answerState: null,
		quiz: [],
		loading: true
		// quiz: [
		// 	{
		// 		id: 1,
		// 		question: 'Какого цвета небо?',
		// 		rightAnswerId: 2,
		// 		answers: [
		// 			{text: 'Черный', id: 1},
		// 			{text: 'Синий', id: 2},
		// 			{text: 'Красный', id: 3},
		// 			{text: 'Зеленый', id: 4}
		// 		]
		// 	},
		// 	{
		// 		id: 2,
		// 		question: 'В каком году основали Санкт-Петербург?',
		// 		rightAnswerId: 3,
		// 		answers: [
		// 			{text: '1700', id: 1},
		// 			{text: '1702', id: 2},
		// 			{text: '1703', id: 3},
		// 			{text: '1803', id: 4}
		// 		]
		// 	}
		// ]
	}
	async componentDidMount() {
		try {
			const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
			const quiz = response.data;

			this.setState({
				quiz,
				loading: false
			})
		} catch (error) {
			console.log(error)
		}
	}
	onAnswerClickHandler = (answersId) => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0];
			if (this.state.answerState[key] === 'success') {
				return;
			}
		}
		const question = this.state.quiz[this.state.activeQuestion];
		const results = this.state.results;
		const activeQuestion = this.state.activeQuestion;

		console.log(question.rightAnswerId, answersId)
		if (question.rightAnswerId == answersId) {
			if (!results[activeQuestion]) {
				results[activeQuestion] = 'success'
			}

			this.setState({
				answerState: {[answersId]: 'success'},
				results
			});

			const timeout = window.setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState({
						isFinished: true
					})
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					})
				}
				window.clearTimeout(timeout);
			}, 1000)
		} else {
			results[activeQuestion] = 'error';
			this.setState({
				answerState: {[answersId]: 'error'},
				results
			});
		}	
	}
	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length;
	}
	onRetryHandler() {
		this.setState({
			results: {},
			isFinished: false,
			activeQuestion: 0,
			answerState: null
		});
	}
	render() {
		return (
			<div className={'quiz'}>
				<div className={'quiz__wrapper'}>
					<h1>Ответьте на все вопросы</h1>
					{
						this.state.loading
						? <Loader/>
						: this.state.isFinished
							? <FinishedQuiz
								onRetry={this.onRetryHandler.bind(this)}
								results={this.state.results}
								quiz={this.state.quiz}
							/>
							: <ActiveQuiz
								question={this.state.quiz[this.state.activeQuestion].question}
								answers={this.state.quiz[this.state.activeQuestion].answers}
								onAnswerClick={this.onAnswerClickHandler}
								quizLength={this.state.quiz.length}
								answerNumber={this.state.activeQuestion + 1}
								state={this.state.answerState}
							/>
					}
					
				</div>
			</div>
		)
	}
}

export default Quiz;