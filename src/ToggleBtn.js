import React, { Component } from 'react';
import './css/ToggleBtn.css';

export class ToggleBtn extends Component {
	render(){
		return(
			<button 
					className={ "btn btn-default toggleBtn" + this.props.classAdd }
					type="button"
					// On enlève cette fonction Bootstrap qui perturbe le fonctionnement
						// data-toggle="collapse"
					data-toggle="dropdown"
					data-target={ this.props.dataTarget } 
					onClick={ this.props.onClick } 
					aria-expanded={ this.props.ariaExpanded }
					>
 					<span 	className="glyphicon glyphicon-upload toggleBtnIcon" 
 							aria-hidden="true"></span>
			</button>
		);
	}
}