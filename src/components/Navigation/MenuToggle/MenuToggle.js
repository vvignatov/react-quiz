import React from 'react';
import './MenuToggle.css';

const MenuToggle = props => {
	const classes=['menu-toggle fa'];

	if (props.isOpen) {
		classes.push('fa-times open')
	} else {
		classes.push('fa-bars')
	}

	return(
		<i
			className={classes.join(' ')}
			onClick={props.onToggle}
		/>
	)
};

export default MenuToggle;