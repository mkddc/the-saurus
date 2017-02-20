import React, { Component } from 'react';

export class SearchSuggestion extends Component {
	constructor(){
		super();
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.createListItems = this.createListItems.bind(this);
		this.state = {
			optionSelectedIndex: 0,
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			optionSelectedIndex: 0,
		});
	}
	createListItems(arr){
		var listItems = arr.map(function(element,i) {
			return(
				<option key={ i } value={ arr[i] } >
					{ arr[i] }
				</option>
			);
		});
		return listItems;
	}
	handleKeyDown(e){
		// gestion de l'emploi des fleches pour descendre dans la sélection de mots suggérés
		if(e.which === 38 || e.which === 40){
			e.preventDefault();			
		}

		var noOfOptions = document.querySelector('#box').length;

			var currentOption = document.querySelector('#box').selectedIndex;
			var nextOption = currentOption;

			// UP ARROW
			if(e.which === 38)
			{
				// On décrément par un, sauf si on devient négatif
				nextOption = (currentOption - 1 < 0) ? noOfOptions : currentOption - 1;
				if (currentOption - 1 < 0) {
					document.querySelector('#searchInpt').focus();
				}
				else {
					nextOption = currentOption - 1;
				}
				this.setState(
					{
						optionSelectedIndex: nextOption
					} 
				);
			}
			// DOWN ARROW (40):
			if(e.which === 40)
			{
				//On incrémente par 1
				nextOption = (currentOption + 1 > noOfOptions) ? 0 : currentOption + 1;
				this.setState(
					{
						optionSelectedIndex: nextOption
					} 
				);
			}
			// ENTER
			if(e.which === 13)
			{
				// On appelle la routine de recherche du mot
				this.props.onChange(e);
			}
	}
	render(){
		return (
			<select id="box" onKeyDown={this.handleKeyDown} size={ this.props.size } className={this.props.className} onChange={this.props.onChange} tabIndex="-1" autoComplete="off" 
				value={ this.props.suggestion[this.state.optionSelectedIndex] }
			>
				{ this.createListItems(this.props.suggestion) }
			</select>
		);
	}
}