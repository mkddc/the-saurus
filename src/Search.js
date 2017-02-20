import React, { Component } from 'react';
import { SearchSuggestion } from './SearchSuggestion';
import './css/Search.css';

var wordFile = require('./json/list.json');
var wordListArray = wordFile.words.sort();

export class Search extends Component {
	constructor(){
		super();

		this.state = {
			wordList: wordListArray,
			wordInput: "",
			suggestions: [],
			suggestionBox: false,
			suggestionBoxSize: "",
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeys = this.handleKeys.bind(this);
		this.suggestionSelect = this.suggestionSelect.bind(this);
	}
	componentWillReceiveProps(nextProps){
		if (this.props.value !== "") { // Afin d'éviter de remplir le champ input pour le random word
			// Pour permettre la MAJ de input value au cas où l'on clique sur un lien-mot
			this.setState({
				wordInput: nextProps.inputValue
			});		
		}
	}
	// handleChange doit lancer une instant search (à partir de la 3e lettre)
	handleChange(e){
		var input = e.target.value;
		this.setState({
			wordInput: input
		});

		this.instantSearch(input);
	}
	instantSearch(newWord){
		var suggestions = [];
		var wLength = newWord.length;

		if (wLength >= 3) {			
			// Filtrage des mots qui nous intéressent en suggestion
			suggestions = this.filterSearch(this.state.wordList, newWord);
			var sLength = suggestions.length;
			// Il y a des résultats de recherche instantannée
			if (sLength !== 0) {
				// Si il y a des suggestions, on ouvre la box
				this.setState({ suggestionBox: true });
				// Si plus de 10 suggestions, taille de box = 10 max
				if (sLength >= 10) {
					this.setState({ suggestionBoxSize: 10 });
				}
				// Si moins de 10 suggestions, taille de box = nb de suggestions (2 minimum)
				else{
					if (sLength === 1) {
						this.setState({ suggestionBoxSize: 2 });
					}
					else{
						this.setState({ suggestionBoxSize: sLength });
					}	
				}
			}
			// Il n'y a pas de résultats de recherche instantannée
			else {
				this.setState({ suggestionBox: false });
			}
		}
		else{
			// Si la box est ouverte, on la ferme
			if (this.state.suggestionBox === true) {
				this.setState({ suggestionBox: false });
			}
		}

		this.setState(
			{ suggestions: suggestions }
		);

	}
	filterSearch(words, wordToCompare){		
		var filteredWords = words.filter(function(element) {
       		if (element.indexOf(wordToCompare) === 0) {
				return true;
			} else {
				return false;
			}
   		});
    	return filteredWords;
	}
	handleClick(e){
		// On enlève les espaces en bout de chaine, s'il y en a
		var searchRequestFull = this.state.wordInput.trim();

		// on ne considère que les headwords (même s'il y a des suggestions composées)
		// "fire up" => "fire"
			// Séparateurs : " " et "-"
		var regExpr = /[\s-]+/;
		var arrDef = searchRequestFull.split(regExpr);

		var searchRequest;

		if(searchRequestFull.indexOf("-") !== -1){
			searchRequest = arrDef[1];
		}
		else{
			searchRequest = arrDef[0];
		}
		
		// Constitution de l'url de recherche pour le thesaurus :
		var urlRequest = "http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/" + searchRequest + "?key=5110be35-8164-47d6-a89d-3d88dcaa2932";

		// Au clic sur le bouton, on fait disparaître la suggestionBox
		this.setState({
			suggestionBox: false
		});

		this.props.onClick(urlRequest, searchRequestFull);
	}
	suggestionSelect(e){
		var suggestionPicked = e.target.value;

		this.setState({
			wordInput: suggestionPicked,
			// Au clic sur une mot, on ferme la fenêtre de suggestion :
			suggestionBox: false
			// Rajout d'une fonction de callback : lancer la recherche
			}
			,() => { 
				this.handleClick(); 
			}
		);
	}
	handleKeys(event){
		if (event.which === 13 /* Enter */) {
			event.preventDefault();
			this.handleClick();
		}

		if(document.activeElement.id === "searchInpt"){
			// On est sur l'input. Down Arrow nous fait passer sur la box (premier élément)
			if(event.which === 40) {
				document.querySelector('#box').focus();
			}
		}
	}
	render(){
		return (
			<div>
				<form className="form-inline" id="searchForm" autoComplete="off">
					<img id="logoImg" src="logo-the-saurus-100.png" alt="logo" />
					<input 	type="text" 
							className="form-control"
							id="searchInpt"
							onChange={ this.handleChange }
							onKeyDown={ this.handleKeys }
							value={ this.state.wordInput }
							placeholder="Type word" />				
					<button type="button"
							onClick={ this.handleClick }
							className="btn btn-default"
							id="searchBtn" >Search</button>
				</form>
				<SearchSuggestion
					className={ this.state.suggestionBox === true ? "form-control suggestionBoxOpen" : "form-control suggestionBoxClosed" }
					suggestion={ this.state.suggestions } 
					onChange={ this.suggestionSelect }
					size={ this.state.suggestionBoxSize }
				/>
			</div>

		);
	}
};
