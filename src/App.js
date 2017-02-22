import React, { Component } from 'react';
import { Search } from './Search';
import { Result } from './Result';
import { Footer } from './Footer';
import { RandomTitle } from './RandomTitle';

var wordFile = require('./json/list.json');
var wordListArray = wordFile.words.sort();

class App extends Component {
	constructor(){
		super();
		this.state = {
			wordSearched: '',
			definition: [],
			error: false,
			// Premier render : un mot au hasard
			wordInput: wordListArray[Math.floor(Math.random() * wordListArray.length)],
		};
		this.checkForMatch = this.checkForMatch.bind(this);
		this.searchClicked = this.searchClicked.bind(this);
		this.handleSpecialChar = this.handleSpecialChar.bind(this);
	}
	componentWillMount(){
		// Choix d'un mot au hasard, en arrivant sur la page :
		// var randomWord = wordListArray[Math.floor(Math.random() * wordListArray.length)];

		var urlDef = "https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/" + this.state.wordInput + "?key=5110be35-8164-47d6-a89d-3d88dcaa2932";

		this.checkForMatch(urlDef, this.state.wordInput);
	}
	checkForMatch(urlDef, searchRequestFull){
		// Requête sur le dictionnaire des synonymes :
		var that = this;
		fetch(urlDef)
		.then(function(response) {
			if (response.status >= 400) {
				console.log('response.status :');
				console.log(response);
				throw new Error("Bad response from server");
			}
			return response.text();
		})
		.then(function (str) {
			var parser = new DOMParser();
			var data = parser.parseFromString(str, "text/xml");
			return data;
		})
		.then(function(dataXML) {
			console.log(dataXML);
			var nbTypes = dataXML.getElementsByTagName("entry").length;
			// Pas de résultat de recherche dans le dictionnaire :
			if (nbTypes === 0) {
				that.setState({
					definition: [],
					error: true,
					wordInput : ''
				})
			}
			// Le mot a été trouvé :
			else
			{
				// Récupération, par types d'entrées, du nombre de définitions disponibles :
				var defs = [];

				for (var i = 0; i < nbTypes; i++) {
					// Mot exact correpondant à la définition
					var entry = dataXML.getElementsByTagName("entry")[i].id;

					// On remplace les balises de caractères spéciaux
					entry = that.handleSpecialChar(entry);

					// type de mot (adj, nom, etc...)
					var entryType = "";
					if (dataXML.getElementsByTagName("entry")[i].getElementsByTagName("fl").length !== 0) {
						entryType = dataXML
						.getElementsByTagName("entry")[i]
						.getElementsByTagName("fl")[0].innerHTML;
					}
					// Pour un type d'entrée d'un mot, constitution du tableau
					// de ses sous-définitions, synonymes et antonymes :
					var miniDefs = [];
					var miniSyns = "";
					var miniAntos = "";

					var miniDefsLength = dataXML.getElementsByTagName("entry")[i]
					.getElementsByTagName("sens").length;

					// Récupération des définitions, synonymes et antonymes pour cette entry :
					// Remplissage des tableau :
					for (var j = 0; j < miniDefsLength; j++) {
						
						var arrKey = "";
						
						miniDefs[j] = dataXML
						.getElementsByTagName("entry")[i]
						.getElementsByTagName("sens")[j]
						.getElementsByTagName("mc")[0].textContent;

						if(dataXML.getElementsByTagName("entry")[i].getElementsByTagName("sens")[j].getElementsByTagName("syn").length !== 0)
						{
							miniSyns = dataXML
							.getElementsByTagName("entry")[i]
							.getElementsByTagName("sens")[j]
							.getElementsByTagName("syn")[0].textContent;
						}
						if(dataXML.getElementsByTagName("entry")[i].getElementsByTagName("sens")[j].getElementsByTagName("ant").length !== 0)
						{
							miniAntos = dataXML
							.getElementsByTagName("entry")[i]
							.getElementsByTagName("sens")[j]
							.getElementsByTagName("ant")[0].textContent;
						}
					}

					// Si le type d'entrée n'est pas spécifié, on ne met pas de ()
					// dans le titre :
					if (entryType !== "") {
						arrKey = i + 1 + " - " + entry + " (" + entryType + ")";
					}
					else {
						arrKey = entry;
					}
					// On range les synonymes et antonymes avec les définitions 
					// afférentes à la clé considérée
					defs[arrKey] = [miniDefs, miniSyns, miniAntos, entry, entryType]; 
				}

				that.setState({
					wordSearched: dataXML.getElementsByTagName("entry")[0]
						.getElementsByTagName("term")[0]
						.textContent,
					definition: defs,
					error: false,
					// test de faisabilité
					wordInput: searchRequestFull
				});
			}
		})
	}
	handleSpecialChar(word){
		word = word.replace(/{aacute}/g, "à");
		word = word.replace(/{agrave}/g, "á");
		word = word.replace(/{acirc}/g, "â");
		word = word.replace(/{Agrave}/g, "Á");
		word = word.replace(/{amp}/g, "&");
		word = word.replace(/{apos}/g, "'");
		word = word.replace(/{ast}/g, "*");
		word = word.replace(/{atilde}/g, "ã");
		word = word.replace(/{auml}/g, "ä");
		word = word.replace(/{ccedil}/g, "ç");
		word = word.replace(/{deg}/g, "°");
		word = word.replace(/{eacute}/g, "é");
		word = word.replace(/{Eacute}/g, "É");
		word = word.replace(/{ecirc}/g, "ê");
		word = word.replace(/{Ecirc}/g, "Ê");
		word = word.replace(/{egrave}/g, "è");
		word = word.replace(/{emsp}/g, " ");
		word = word.replace(/{euml}/g, "ë");
		word = word.replace(/{excl}/g, "!");
		word = word.replace(/{hellip}/g, "…");
		// word = word.replace(/{hudot}/g, "h");
		word = word.replace(/{icirc}/g, "î");
		word = word.replace(/{iuml}/g, "ï");
		word = word.replace(/{mdash}/g, "–");
		word = word.replace(/{ndash}/g, "-");
		word = word.replace(/{ntilde}/g, "ñ");
		word = word.replace(/{ocirc}/g, "ô");
		word = word.replace(/{ouml}/g, "ö");
		word = word.replace(/{percnt}/g, "%");
		word = word.replace(/{rdquo}/g, "\"");
		word = word.replace(/{rsquo}/g, "'");
		word = word.replace(/{uacute}/g, "ù");
		word = word.replace(/{uuml}/g, "ü");

		word = word.replace(/\{(.+?)\}/g, "");

		return word;

	}
	searchClicked(str){
		var url = "https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/" + str + "?key=5110be35-8164-47d6-a89d-3d88dcaa2932";
		this.checkForMatch(url, str);
	}
	setNewValue(){
		return this.state.wordSearched;
	}
    render() {
        return (
	        	// Ici, on appelle la fct changeValue pour récupérer la bonne
	        	// valeur de this.state.word => pb du one step behind...
        	<div>
	            <Search 
	            		onClick={ this.checkForMatch } 
	            		value={ this.setNewValue() } 
	            		suggestion={ this.state.suggestions }
	            		inputValue={ this.state.wordInput }
	            />
	            <RandomTitle 	wordInputFull={ this.state.wordInput } 
	            				error={ this.state.error } />
	            <Result 
	            		definition={ this.state.definition } 
	            		synonyms={ this.state.synonyms } 
	            		error={ this.state.error } 
	            		onClick={ this.searchClicked }
	            		wordSearched={ this.state.wordSearched }
	            		wordInputFull={ this.state.wordInput }
	            		/>
	           	<Footer inputValue={ this.state.wordInput }
						error={ this.state.error } 
	           	/>
            </div>
        );
    }
}

export default App;
