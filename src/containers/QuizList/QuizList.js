import React, { Component } from 'react';
import './QuizList.css';
import {NavLink} from 'react-router-dom';
import Loader from '../../components/Ui/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

class QuizList extends Component {
	renderQuizes() {
		return this.props.quizes.map(item => {
			return (
				<li key={item.id}>
					<NavLink to={'/quiz/' + item.id}>{item.name}</NavLink>
				</li>
			)
		})
	}
	componentDidMount() {
		this.props.fetchQuizes();
	}
	render() {
		return (
			<div className={'quiz-list'}>
				<div>
					<h1>Список тестов</h1>
					{
						this.props.loading || !this.props.quizes
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

function mapStateToProps(state) {
	return {
		quizes: state.quiz.quizes,
		loading: state.quiz.loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizes: () => dispatch(fetchQuizes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
