import React from 'react';
import './ActiveQuiz.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
	<div className={'activequiz'}>
		<p className={'question'}>
			<span>
				<strong>{props.answerNumber}.</strong>&nbsp;
				{props.question}
			</span>

			<small>{props.answerNumber} из {props.quizLength}</small>
		</p>
		<AnswersList
			answer={props.answers}
			onAnswerClick={props.onAnswerClick}
			state={props.state}
		/>
	</div>
)

export default ActiveQuiz;