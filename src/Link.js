import React, { Component } from 'react';


export class Link extends Component {
	constructor(){
		super();
		this.handleLink = this.handleLink.bind(this);
	}
	handleLink(str){
		// On ne garde que le mot cliqué, sans les précisions ou particularités
		var wordClicked = str.split(", ")[0];
		wordClicked = wordClicked.split(" [")[0];
		wordClicked = wordClicked.split(" (")[0];

		return wordClicked;
	}
	render(){
		return (
			<a 	href="#" 
			  	key={ this.props.lKey } 
			  	style={ { textDecoration: 'none' } }
			  	// ()=> pour empêcher le déclenchement de la fonction au render,
			  	// et laisser faire, juste au clic sur le lien
			  	onClick={ () => this.props.onClick(this.handleLink(this.props.wordClicked)) } 
			  	>
				{ this.props.wordClicked }{ this.props.punct }
			</a>
		);
	}
}