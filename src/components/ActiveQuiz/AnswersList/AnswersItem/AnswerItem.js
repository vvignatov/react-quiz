import React from 'react';
import './AnswerItem.css';

const AnswerItem = props => {
	const classes = ['answer-item'];

	if (props.state) {
		classes.push(props.state)
	}

	return (
		<li
			className={classes.join(' ')}
			onClick={() => {props.onAnswerClick(props.answer.id)}}
		>
			{ props.answer.text }
		</li>
	)
}

export default AnswerItem;