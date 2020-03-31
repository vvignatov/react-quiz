import React, { Component } from 'react';
import './QuizList.css';
import {NavLink} from 'react-router-dom';
import Loader from '../../components/Ui/Loader/Loader';
import axios from '../../axios/axios-quiz';

class QuizList extends Component {
	state = {
		quizes: [],
		loading: true
	}
	renderQuizes() {
		return this.state.quizes.map(item => {
			return (
				<li key={item.id}>
					<NavLink to={'/quiz/' + item.id}>{item.name}</NavLink>
				</li>
			)
		})
	}
	async componentDidMount() {
		try {
			const response = await axios.get('/quizes.json');
			const quizes = [];

			Object.keys(response.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Тест №${index + 1}`
				})
			});

			this.setState({
				quizes, loading: false
			})
		} catch (error) {
			console.log(error)
		}
	}
	render() {
		return (
			<div className={'quiz-list'}>
				<div>
					<h1>Список тестов</h1>
					{
						this.state.loading
						? <Loader/>
						: <ul>
							{ this.renderQuizes() }
						 </ul>
					}
				</div>
			</div>
		);
	}
}

export default QuizList;
