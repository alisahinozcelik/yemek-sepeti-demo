/// <reference path="../common.d.ts" />

import { stringToPrice, areMapsEqual, numberPatternHandler, marker } from '../shared/utilities';
import { PRODUCT_TEMPLATE, CATEGORY_TEMPLATE, EMPTY_LIST_MESSAGE } from '../shared/templates';
import { Cart } from './cart';

interface IProductRaw {
	DisplayName: string;
	Description: string;
	ListPrice: string;
}

interface ICategoryRaw {
	DisplayName: string;
	Products: IProductRaw[];
}

export class Product {
	public category: Category;
	public element: HTMLElement = (PRODUCT_TEMPLATE.cloneNode(true) as HTMLElement);
	public price: number;
	public name: string;
	public desc: string;
	private nameCont = this.element.querySelector('h6');
	private descCont = this.element.querySelector('p');

	constructor(rawProduct: IProductRaw, category: Category, cart: Cart) {
		this.category = category;
		this.price = stringToPrice(rawProduct.ListPrice);
		this.name = rawProduct.DisplayName;
		this.desc = rawProduct.Description;

		const input = this.element.querySelector('input');

		this.highlight();

		numberPatternHandler(input);
		this.element.querySelector('form').addEventListener('submit', e => {
			e.preventDefault();
			cart.add(this, +input.value || 1);
		});


		(this.element.querySelector('.price') as HTMLDivElement).innerText = rawProduct.ListPrice + ' TL';
	}

	public highlight(text?: string):void {
		if (!text) {
			this.nameCont.innerText = this.name;
			this.descCont.innerText = this.desc;
			return;
		}

		const regex = new RegExp(text, 'gi');

		this.nameCont.innerHTML = this.name.replace(regex, marker);
		this.descCont.innerHTML = this.desc.replace(regex, marker);
	}
}

class Category {
	public name: string;
	public element: HTMLElement = (CATEGORY_TEMPLATE.cloneNode(true) as HTMLElement);

	constructor(name: string) {
		this.name = name;
		this.element.querySelector('h5').innerText = this.name;
	}
}

export class MenuClass {
	public categories: Category[] = [];
	public products: Product[] = [];
	public search: HTMLInputElement = (document.getElementById('search') as HTMLInputElement);
	private isSearchBound: boolean = false;
	private previousMap: Map<Category, Product[]>;
	private cart:Cart = new Cart();
	private emptyMessage = EMPTY_LIST_MESSAGE;	

	constructor() {
		let rawData = require('../data/menuData.json').d.ResultSet;

		rawData.forEach((category:ICategoryRaw) => {
			const createdCategory = new Category(category.DisplayName); 
			this.categories.push(createdCategory);

			category.Products.forEach(product => {
				this.products.push(new Product(product, createdCategory, this.cart));
			});
		});

		this.cart.init(this.products);
	}

	public render():void {
		const container = document.getElementById('list');
		const filterText = this.search.value.toLowerCase();
		const newMap = new Map<Category, Product[]>();

		const filteredProducts = this.products.filter(product => {
			return product.name.toLowerCase().indexOf(filterText) > -1 || product.desc.toLowerCase().indexOf(filterText) > -1; 
		});

		filteredProducts.forEach(product => {
			if (newMap.has(product.category)) {
				newMap.get(product.category).push(product);
			}
			else {
				newMap.set(product.category, [product]);
			}

			product.highlight(filterText);
		});

		if (!areMapsEqual(newMap, this.previousMap)) {

			this.previousMap = newMap;

			while (container.hasChildNodes()) {
				container.removeChild(container.lastChild);
			}

			newMap.forEach((products, category) => {
				const categoryContainer = category.element.cloneNode(true);

				products.forEach(product => {
					categoryContainer.appendChild(product.element);
				});

				container.appendChild(categoryContainer);
			});

			if (!newMap.size) {
				container.appendChild(this.emptyMessage);
			}
		}

		if (!this.isSearchBound) {
			this.isSearchBound = true;

			this.search.addEventListener('input', e => {
				this.render();
			});
		}
	}
}

export const Menu = new MenuClass();