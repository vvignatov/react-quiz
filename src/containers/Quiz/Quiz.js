import React from 'react';
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/Ui/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends React.Component {
	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id);
	}
	componentWillUnmount() {
		this.props.retryQuiz();
	}
	render() {
		return (
			<div className={'quiz'}>
				<div className={'quiz__wrapper'}>
					<h1>Ответьте на все вопросы</h1>
					{
						this.props.loading || !this.props.quiz
						? <Loader/>
						: this.props.isFinished
							? <FinishedQuiz
								onRetry={this.props.retryQuiz}
								results={this.props.results}
								quiz={this.props.quiz}
							/>
							: <ActiveQuiz
								question={this.props.quiz[this.props.activeQuestion].question}
								answers={this.props.quiz[this.props.activeQuestion].answers}
								onAnswerClick={this.props.quizAnswerClick}
								quizLength={this.props.quiz.length}
								answerNumber={this.props.activeQuestion + 1}
								state={this.props.answerState}
							/>
					}
					
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		results: state.quiz.results,
		isFinished: state.quiz.isFinished,
		activeQuestion: state.quiz.activeQuestion,
		answerState: state.quiz.answerState,
		quiz: state.quiz.quiz,
		loading: state.quiz.loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);