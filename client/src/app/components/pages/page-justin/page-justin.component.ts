import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';

@Component({
	selector: 'app-page-justin',
	templateUrl: './page-justin.component.html',
	styleUrls: ['./page-justin.component.css']
})
export class PageJustinComponent implements OnInit
{

	text: string = "";
	title: string = "TombeDuCamion";

	collaborateurs: { idx: number, nom: string, fonction: string, ambition: string }[] = [
		{ idx: 0, nom: 'Yann TROU', fonction: 'Chef de Projet', ambition: 'Staline incarné' },
		{ idx: 1, nom: 'Matthieu JOULAIN', fonction: 'Codeur', ambition: 'AD Carry programmation' },
		{ idx: 2, nom: 'Jonathan MARTIN-MAESTRE', fonction: 'Responsable Communication', ambition: '?' },
		{ idx: 3, nom: 'Justin BIZOUARD', fonction: 'Responsable Qualité', ambition: '10E' },
		{ idx: 4, nom: 'Axel TOUSSENEL', fonction: 'Codeur', ambition: 'le S tu connais' },
		{ idx: 5, nom: 'Wassim DJELLAT', fonction: 'Codeur', ambition: 'futur chomeur' },
		{ idx: 6, nom: 'Arthur NICOLLE', fonction: 'Stagiaire', ambition: 'le stagiaire de 3ème' },
	]

	collab: { idx: number, nom: string, fonction: string, ambition: string } | undefined;
	constructor()
	{
	}


	onGroupsChange(options: MatListOption[])
	{
		// map these MatListOptions to their values
		let i = options.map(o => o.value)[0];

		this.collab = this.collaborateurs[i];
	}

	ngOnInit()
	{

	}
}
