import React, { Component } from 'react';
import { ToggleBtn } from './ToggleBtn';
import './css/LiPanel.css'

export class LiPanel extends Component {
	constructor(){
		super();
		this.changePanelState = this.changePanelState.bind(this);

		this.state = {
			panelOpened: "",
			ariaExpanded: "",
			divClass: ""
		}
	}
	// Appelé à la toute première requête seulement :
	componentWillMount(){
		if(this.props.wordInputFull !== this.props.wordSearched){
			// Si le panel correspond à la requête composée dans la 
			// liste des résultats du headword considéré, on ouvre uniquement celui ci.
			if(this.props.entry === this.props.wordInputFull){
				this.setState({
					panelOpened: "true",
					ariaExpanded: "true",
					divClass: "panel"
				});
			}
			else{
				this.setState({
					panelOpened: "false",
					ariaExpanded: "false",
					divClass: "panelClosed"
				});				
			}
		}
		else
		{
			this.setState({
				panelOpened: "true",
				ariaExpanded: "true",
				divClass: "panel"
			});
		}

	}
	componentWillReceiveProps(nextProps){
		// Si la requête originale est un mot composé :
		if(nextProps.wordInputFull !== nextProps.wordSearched){
			// Si le panel correspond à la requête composée dans la 
			// liste des résultats du headword considéré, on ouvre uniquement celui ci.
			var entry = nextProps.entry;
			var wordInputFull = nextProps.wordInputFull;

			if(entry.toLowerCase() === wordInputFull.toLowerCase()){
				this.setState({
					panelOpened: "true",
					ariaExpanded: "true",
					divClass: "panel"
				});
			}
			else{
				this.setState({
					panelOpened: "false",
					ariaExpanded: "false",
					divClass: "panelClosed"
				});				
			}
		}
		else
		{
			this.setState({
				panelOpened: "true",
				ariaExpanded: "true",
				divClass: "panel"
			});
		}


	}
	changePanelState(e){
		var bool = "";
		var ariaExp = "";
		var dClass = "";

		this.state.panelOpened === "true" ? bool = "false" : bool = "true";
		this.state.ariaExpanded === "true" ? ariaExp = "false" : ariaExp = "true";
		this.state.divClass === "panel" ? dClass = "panelClosed" : dClass = "panel";

		this.setState({
			panelOpened: bool,
			ariaExpanded: ariaExp,
			divClass: dClass
		});
	}
	render(){
		return(
			<li className="block" key={ this.props.LiPKey }>

				<p className="wordKey" key={ this.props.LiPKey + "Title"}>
					{ this.props.entry }
					<span 	className="typeSpan">{" (" + this.props.entryType + ")" }</span>

					<ToggleBtn dataTarget={ "#panel_" + this.props.entry  + "_" + this.props.LiPKey } 
								onClick={ this.changePanelState } 
								ariaExpanded={ this.state.ariaExpanded }
								classAdd={ this.state.panelOpened === "false" ? " collapsed" :  ""}
					/>
				</p>

				<div 	className={ this.state.divClass }
						key={ this.props.LiPKey } 
					 	aria-expanded={ this.state.ariaExpanded } >

					<div className="container-fluid meanBlock">
						<div className="row">
							<div className="col-xs-12 col-sm-3 col-md-2 title">
									<p className="meanTitle">Meanings</p>
							</div>
							<div className="col-xs-12 col-sm9 col-md-10 meanBlockList">
								<ul className="meanBlockUl">
									{ this.props.listeMiniDefs }
								</ul>
							</div>
						</div>
					</div>

					<div className="container-fluid synBlock">
						<div className="row">
							<div className="col-xs-12 col-sm-3 col-md-2 title">
								<p className="synTitle">Synonyms</p>
							</div>
							<div className="col-xs-12 col-sm9 col-md-10 synList">
								<div className="synListDiv">{ this.props.l_s }</div>
							</div>
						</div>
					</div>

					<div className="container-fluid antoBlock">
						<div className="row">
							<div className="col-xs-12 col-sm-3 col-md-2 title" >
								<p className="antoTitle">Antonyms</p>
							</div>
							<div className="col-xs-12 col-sm9 col-md-10 antoList">
								<div className="antoListDiv">{ this.props.l_a === "" ? "(No antonyms found)" : this.props.l_a }</div>
							</div>
						</div>
					</div>

				</div>

			</li>
		);		
	}
}