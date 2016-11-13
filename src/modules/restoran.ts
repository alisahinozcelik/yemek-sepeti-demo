/// <reference path="../common.d.ts" />

import { numberToCurrency } from '../shared/utilities';
import { CIRCLE_TEMPLATE } from '../shared/templates';

interface IRestoranDetails {
	minPrice: number;
	workingHours: string;
	deliveryTime: number;
}

interface INode extends HTMLElement {
	content: Node;
}

const SELECTED_AREA:string = 'Bebek';

class RestoranClass {
	public scores: {[key: string]: number} = {};
	public details: IRestoranDetails = {
		minPrice: 0,
		workingHours: 'Kapalı',
		deliveryTime: 30
	};
	public logoUrl: string;
	public name:string;

	constructor() {
		const rawData = require('../data/restoranData.json').d.ResultSet;

		// Scores
		this.scores['speed'] = rawData.Speed;
		this.scores['serving'] = rawData.Serving;
		this.scores['flavour'] = rawData.Flavour;

		// Details
		rawData.WorkingHours.some((day:any) => {
			if (day.IsToday) {
				return this.details.workingHours = day.WorkingHours[0];
			}
		});
		rawData.DeliveryAreas.some((area:any) => {
			if (area.AreaName === SELECTED_AREA) {
				this.details.minPrice = area.MinimumPrice;
				this.details.deliveryTime = area.DeliveryTime;
				return true;
			}
		});

		// Logo Url
		// this.logoUrl = "https://cdn.yemeksepeti.com" + rawData.ImagePath;
		this.logoUrl = "https://cdn.yemeksepeti.com/CategoryImages/subway_big.gif";

		// Name
		this.name = rawData.DisplayName;
	}

	public parseHtml():void {
		// Scores
		Object.getOwnPropertyNames(this.scores).forEach(val => {
			const container = document.getElementById(val + '-score')
			container.querySelector('span').innerText = this.scores[val].toString();

			const svg = CIRCLE_TEMPLATE.cloneNode(true);
			const circleLength = 2 * Math.PI * 40;
			container.appendChild(svg);

			setTimeout(() => {
				container.querySelector('circle').style.strokeDashoffset = (251 / 10 * (10 - this.scores[val])) + ''; 
			}, 500);
		});

		// Min Price
		document.getElementById('min-price').querySelector('span').innerText = numberToCurrency(this.details.minPrice);

		// Working Hours
		document.getElementById('working-hours').querySelector('span').innerText = this.details.workingHours;

		// Delivery Time
		document.getElementById('delivery-time').querySelector('span').innerText = this.details.deliveryTime + 'dk.';

		// Restoran Image
		document.getElementById('restoran-logo').style.backgroundImage = `url(${this.logoUrl})`;

		// Name
		document.getElementsByTagName('h1')[0].innerText = this.name;
		console.log(this);
	}
}

export const Restoran = new RestoranClass();