import React from 'react';
import './AnswersList.css';
import AnswerItem from './AnswersItem/AnswerItem';

const AnswersList = props => {
	return (
		<ul className={'answers-list'}>
			{ props.answer.map((item, index) => {
				return (
					<AnswerItem
						key={index}
						answer={item}
						onAnswerClick={props.onAnswerClick}
						state={props.state ? props.state[item.id] : null}
					/>
				)
			})}
		</ul>
	)
}

export default AnswersList;