export const PRODUCT_TEMPLATE: HTMLElement = (function() {

	const element = document.createElement('div');
	element.classList.add('product');

	const countContainer = document.createElement('form');
	countContainer.classList.add('count-container');
	
	const input = document.createElement('input');
	input.value = "1";
	countContainer.appendChild(input);

	const addButton = document.createElement('button');
	addButton.innerText = '+';
	addButton.type = 'submit';
	addButton.title = 'Sepete Ekle';
	countContainer.appendChild(addButton);

	const detailContainer = document.createElement('div');
	detailContainer.classList.add('details');
	detailContainer.appendChild(document.createElement('h6'));
	detailContainer.appendChild(document.createElement('p'));

	const price = document.createElement('div');
	price.classList.add('price');
	
	[countContainer, detailContainer, price].forEach(el => {
		element.appendChild(el);
	});

	return element;
})();

export const CART_PRODUCT_TEMPLATE: HTMLElement = (function() {
	const element = document.createElement('tr');

	const input = document.createElement('input');
	const title = document.createElement('h6');
	const output = document.createElement('output');
	output.classList.add('tar');
	const button = document.createElement('button');
	button.innerText = '-';
	button.title = "Sepetten Çıkar";

	[input, title, output, button].forEach(el => {
		const td = document.createElement('td');
		td.appendChild(el);
		element.appendChild(td);
	});

	return element;
})();

export const CATEGORY_TEMPLATE: HTMLElement = (function() {
	const element = document.createElement('div');
	element.appendChild(document.createElement('h5'));
	return element;
})();

export const EMPTY_CART_MESSAGE: HTMLElement = (function() {
	const element = document.createElement('tr');
	const message = document.createElement('td');
	message.colSpan = 4;
	message.innerText = 'Sepetiniz boş';
	element.appendChild(message);
	return element;
})();

export const EMPTY_LIST_MESSAGE: HTMLElement = (function() {
	const element = document.createElement('div');
	element.innerText = "Aradığınız kriterlerde ürün bulunamadı."
	return element;
})();

export const CIRCLE_TEMPLATE: SVGSVGElement = (function() {
	const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	element.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

	element.setAttribute('width', "100");
	element.setAttribute('height', "100");

	const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	circle.setAttribute('cx', '50');
	circle.setAttribute('cy', '50');
	circle.setAttribute('r', '40');

	element.appendChild(circle);

	return element;
})();