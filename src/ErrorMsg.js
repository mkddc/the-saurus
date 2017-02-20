import React, { Component } from 'react';
import './css/ErrorMsg.css';


export class ErrorMsg extends Component {
	render(){
		return(
			<p 	className="errMsg" 
				style={ this.props.error === false ? { 'display': 'none' } : { 'display': 'block' } } >
				{ this.props.errMsg }
			</p>
		);
	}
}
