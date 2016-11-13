export function stringToPrice(value: string): number {
	let arr = value.split(',');
	return Number(arr[0]) + Number(arr[1]) / 100;
}

export function areMapsEqual<T, U>(first: Map<T, U[]>, second: Map<T, U[]>):boolean {
	if (!first || !second || first.size !== second.size) {
		return false;
	}

	return Array.from(first.keys()).every(key => {
		return second.has(key) && areArraysEqual(first.get(key), second.get(key));
	}); 
}

export function areArraysEqual<T>(first: T[], second: T[]):boolean {
	if (!first || !second || first.length !== second.length) {
		return false;
	}

	return first.every((val, index) => {
		return val == second[index];
	});
}

export function numberToCurrency(value:number):string {
	if (value === 0) {
		return '0,00 TL';
	}
	const arr = Math.round(value * 100).toString().split('');
	arr.splice(arr.length - 2, 0, ',');
	return arr.join('') + ' TL';
}

export function marker(val:string):string {
	return `<mark>${val}</mark>`;
}

export function numberPatternHandler(input:HTMLInputElement):void {
	input.addEventListener('input', numberChangeHandler);
	input.addEventListener('blur', numberBlurHandler);
}

const customChange = new Event('customchange');

function numberChangeHandler(event:Event):void {
	const el = (event.srcElement as HTMLInputElement);
	if (el.value !== "" && (+el.value === 0 || isNaN(+el.value) || el.value.indexOf('e') > -1 || +el.value < 0)) {
		el.value = "1";
	}
	else if (+el.value % 1 != 0) {
		el.value = Math.max(Math.floor(+el.value), 1) + "";
	}

	if (el.value !== "") {
		el.dispatchEvent(customChange);
	}

}

function numberBlurHandler(event:Event):void {
	const el = (event.srcElement as HTMLInputElement);
	if (el.value === "") {
		el.value = "1";
		el.dispatchEvent(customChange);
	}
}