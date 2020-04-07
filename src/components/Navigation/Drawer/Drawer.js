import React, {Component} from 'react';
import './Drawer.css';
import Backdrop from '../../Ui/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';



class Drawer extends Component {
	clickHandler = () => {
		this.props.onClose();
	}
	renderLinks(links) {
		return links.map((item, index) => {
			return (
				<li key={index}>
					<NavLink
						to={item.to}
						exact={item.exact}
						activeClassName={'active'}
						onClick={this.clickHandler}
					>
						{item.label}
					</NavLink>
				</li>
			)
		})
	}
	render() {
		const classes = ['drawer'];

		if (!this.props.isOpen) {
			classes.push('closed')
		}

		let links = [
			{to: '/', label: 'Список', exact: true}
		];

		if (this.props.isAuthenticated) {
			links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
			links.push({to: '/logout', label: 'Выйти', exact: false})
		} else {
			links.push({to: '/auth', label: 'Авторизация', exact: false})
		}

		return (
			<React.Fragment>
				<nav className={classes.join(' ')}>
					<ul>
						{ this.renderLinks(links) }
					</ul>
				</nav>
				{this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
			</React.Fragment>
		)
	}
}

export default Drawer;