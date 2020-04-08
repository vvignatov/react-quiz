import React from 'react';
import './FinishedQuiz.css';
import Button from '../Ui/Button/Button';
import {Link} from 'react-router-dom';

const FinishedQuiz = (props) => {
	function calcRightResults(object) {
		let counter = 0;

		for (let key in object) {
			if (object[key] === 'success'){
				counter += 1;
			}
		}
		return counter;
	}
	return (
		<div className={'finished-quiz'}>
			<ul>
				{ props.quiz.map((item, index) => {
					const classes = ['fa'];

					if (props.results[index] === 'error') {
						classes.push('fa-times error')
					} else {
						classes.push('fa-check success')
					}

					return (
						<li key={index}>
							<strong>{index + 1}.&nbsp;</strong>
							{item.question}
							<i className={classes.join(' ')}/>
						</li>
					)
				}) }
			</ul>

			<p>Правильно {calcRightResults(props.results)} из {props.quiz.length}</p>
			<div>
				<Button onClick={props.onRetry} type={'primary'}>Повторить</Button>
				<Link to="/">
					<Button type={'success'}>Перейти в список тестов</Button>
				</Link>
			</div>
		</div>
	)
};

export default FinishedQuiz;