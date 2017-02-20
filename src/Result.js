import React, { Component } from 'react';
import { Link } from './Link';
import { LiPanel } from './LiPanel';
import { Punct } from './Punct';
import { ErrorMsg } from './ErrorMsg';
import './css/Result.css';

export class Result extends Component {
	constructor(){
		super();

		this.createListDefs = this.createListDefs.bind(this);
		this.handleLinkClick = this.handleLinkClick.bind(this);
	}
	getLength(arr){
		var nb = 0;
		for(var key in arr){
			if(arr.hasOwnProperty(key)){
				nb++;
			}
		}
		return nb;
	}
	createListDefs(arr){
		// Double-mapping à réaliser avec 2 tableaux : 
		// un avec clé et un avec index
		var listDefs = [];
		var i = 0;

		for(var key in arr){
			if(arr.hasOwnProperty(key)){

				var listeMiniDefs = arr[key][0].map(this.mapList);
				
				var listeSynos = arr[key][1];
				var listeAntos = arr[key][2];

				var entry = arr[key][3];
				var entryType = arr[key][4];

				// Il faut remplacer le champ de mots par un champ de liens cliquables :
				var listeSynosTags = this.arrayStrToTags(listeSynos);

				// Mapping des liens du tableau obtenu :
				var l_s = listeSynosTags.map(function(e, i) {
					return e;
				});

				// On fait la même chose pour les antonymes :
				if (listeAntos !== "") {
					var listeAntosTags = this.arrayStrToTags(listeAntos);
					var l_a = listeAntosTags.map(function(e, i) {
						return e;
					});					
				} else {
					l_a = "";
				}

				var miniList = 	
				<LiPanel 	LiPKey={ i } entry={ entry } entryType={ entryType } l_s={ l_s }
							l_a={ l_a } listeMiniDefs={ listeMiniDefs } 
							wordSearched={ this.props.wordSearched }  
							wordInputFull={ this.props.wordInputFull }
				/>;
				
				listDefs.push(miniList);
				i++;
			}
		}
		return listDefs;
	}
	// Fonction de transfo d'un [string] en [array de tags <a> des mots qui composent ce string]
	arrayStrToTags(str){
		var listArray = str.split(", ");
		var listTags = [];

		for (var k = 0; k < listArray.length; k++) {
			var punctuation;

			if (k !== listArray.length - 1) { 
				punctuation = <Punct id={ "punct_" + k } punct=", " />;
			}
			else { 
				punctuation = <Punct id={ "punct_" + k } punct="."/>;
			}

			var html = 	<Link 	lKey={ k } wordClicked={ listArray[k] } punct={ punctuation }
								onClick={ this.handleLinkClick } />;

			listTags[k] = html;
		}
		return listTags;
	}
	handleLinkClick(str){
		return this.props.onClick(str);
	}
	mapList (element,j) {
		// On met la première lettre en majuscule
		element = " - " + element.charAt(0).toUpperCase() + element.slice(1) + ".";
		return(<li key={j}>{ (j + 1) + element }</li>);
	}
	render(){
		return (
			// liste des définitions, suivi de la liste des synonymes et des antonymes.
			<div className="bigListContainer">
				<ErrorMsg error={ this.props.error } errMsg="Sorry, word not found." />
				<ul className="bigList">{ this.createListDefs(this.props.definition) }</ul>
			</div>
		);
	}
};
