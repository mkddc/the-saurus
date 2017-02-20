import React, { Component } from 'react';
import './css/RandomTitle.css'

export class RandomTitle extends Component {
	constructor(){
		super();
		this.state = {
			randomTitleClass: "wordOn"
		};
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.wordInputFull !== this.props.wordInputFull) {
			this.setState({
				randomTitleClass: "wordOff"
			});
		}
	}
	render(){
		return(
	            <h3 className={ this.state.randomTitleClass } > Let's study some random word : 
	            	<span className="randomWord">{" " + this.props.wordInputFull }</span>
	            </h3>
		);
	}
}
