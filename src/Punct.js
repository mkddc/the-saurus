import React, { Component } from 'react';
import './css/Punct.css';


export class Punct extends Component {
	render(){
		return(
			<span id={ this.props.id } className="punctSpan">{this.props.punct}</span>
		);
	}
}