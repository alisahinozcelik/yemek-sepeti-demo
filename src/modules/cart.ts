import { Product, MenuClass } from './menu';
import { CART_PRODUCT_TEMPLATE, EMPTY_CART_MESSAGE } from '../shared/templates';
import { numberPatternHandler, numberToCurrency } from '../shared/utilities';

class CartProduct {
	public element: HTMLElement = (CART_PRODUCT_TEMPLATE.cloneNode(true) as HTMLElement);
	private _count: number = 0;
	private input: HTMLInputElement = this.element.querySelector('input');
	private output: HTMLElement = (this.element.querySelector('output') as HTMLElement);

	constructor(private product:Product, private cart: Cart) {
		this.element.querySelector('h6').innerText = this.product.name;
		this.count = this._count;

		numberPatternHandler(this.input);

		this.input.addEventListener('customchange', e => {
			this.count = +this.input.value;
			this.cart.calculateTotal();
		});

		this.element.querySelector('button').addEventListener('click', () => {
			this.count = 0;
			this.cart.render();
		});
	}

	get count() {
		return this._count;
	}
	set count(val:number) {
		if (val !== this._count) {
			this._count = val;
			this.output.innerText = numberToCurrency(this.total);
			this.input.value = this._count + '';
		}
	}

	get total() {
		return this.product.price * this.count;
	}
}


export class Cart {
	private list: Map<Product, CartProduct> = new Map<Product, CartProduct>();
	private container: HTMLElement = document.getElementById('cart');
	private totalCountElement: HTMLElement = document.getElementById('total');
	private shownProducts: CartProduct[] = [];
	private emptyMessage: HTMLElement = EMPTY_CART_MESSAGE;

	constructor() {}

	public init(products: Product[]):void {
		products.forEach(product => {
			this.list.set(product, new CartProduct(product, this));
		});
		this.render();
		console.log(this);
	}

	public add(product: Product, count:number):void {
		this.list.get(product).count += count;
		this.render();
	}

	public render():void {
		this.shownProducts.splice(0, this.shownProducts.length);

		this.list.forEach(item => {
			if (item.count > 0) {
				this.shownProducts.push(item);
			}
		});

		while (this.container.hasChildNodes()) {
			this.container.removeChild(this.container.lastChild);
		}

		this.shownProducts.forEach(product => {
			this.container.appendChild(product.element);
		});

		if (!this.shownProducts.length) {
			this.container.appendChild(this.emptyMessage);
		}

		this.calculateTotal();
	}

	public calculateTotal():void {
		let total = 0;
		this.shownProducts.forEach(el => {
			total += el.total;
		});

		this.totalCountElement.innerText = numberToCurrency(total);
	}
}