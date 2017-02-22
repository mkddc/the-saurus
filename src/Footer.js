import React, { Component } from 'react';
import './css/Footer.css';


export class Footer extends Component {
	constructor(){
		super();
		this.state = {
			isFirst: true
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			isFirst: false
		});
	}
	render(){
		return(
			<footer id="myFooter" 
					style={ this.state.isFirst === true ? { position: 'fixed', bottom: 0 } : { display: 'none'} }>
			    <p>
			      the-saurus uses the <a target="_blank" href="http://www.dictionaryapi.com/">Dictionary API</a> from <a target="_blank" href="https://www.merriam-webster.com/">Merriam-Webster Inc. <img id="logoMW" src="mw-logo-light-background-50x50.png" alt="logo Merriam-Webster Inc." /></a>
			    </p>
			    <p>the-saurus also uses <a target="_blank" href="http://getbootstrap.com/">Bootstrap</a> and the <a target="_blank" href="http://glyphicons.com/">Glyphicons</a> Halflings set.
			    </p>
			</footer>
		);
	}
}