if ('NodeList' in window && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

class FormObj {
	constructor(form, params) {
		this.form = form;
		this.params = params;
		this.isFormCorrect = false;

		this.classes = {
			error: 'error',
			empty: 'empty',
			correct: 'correct'
		};

		if (this.params.classes) {
			this.classes.error = this.params.classes['error'] ? this.params.classes['error'] : 'error';
			this.classes.empty = this.params.classes['empty'] ? this.params.classes['empty'] : 'empty';
			this.classes.correct = this.params.classes['correct'] ? this.params.classes['correct'] : 'correct';
		}

		this.realTimePresets = {
			text: /[^\,A-Za-zА-Яа-я0-9.,@\-_#№%*+=$"!/ ]+/g,
			phone: /[^0-9+-_() ]+/g,
			num: /[^0-9]+/g,
			letters: /[^a-zA-Zа-яА-я]+/g,
			email: /[^A-Za-zА-Яа-я0-9@._-]+/g
		};

		this.presets = {
			email: /^[.0-9a-zA-Zа-яА-Я_-]+@[0-9a-zA-Zа-яА-Я_-]+?\.[a-zA-Zа-яА-Я]{2,}$/,
			phone: /^((\+7|7|8)+([0-9()-_ ]){10,20})$/
		};

		this.events = {
			beforeSubmit: [],
			submit: [],
			error: [],
			empty: [],
			correct: []
		};

		this.addEvents();
	}

	validateForm() {
		this.params.fields.forEach((field) => {
			this.validateField(field);
		})

		this.isFormCorrect = this.params.fields.every((field) => {
			return field.status;
		})
	}

	validateField(field) {
		const elem = this.form.querySelector(field.selector);

		if (elem) {
			if (elem.type == 'checkbox' && field.required && !elem.checked) {
				this.setClass(elem, 'error');
				field.status = false;
				if (this.events.error.length) {
					this.events.error.forEach((func) => func(elem));
				}
				return;
			}

			if (elem.value.length == 0 && field.required) {
				this.setClass(elem, 'empty');
				field.status = false;
				if (this.events.empty.length) {
					this.events.empty.forEach((func) => func(elem));
				}
				return;
			}

			if (field.maxLength && elem.value.length > field.maxLength) {
				this.setClass(elem, 'error');
				field.status = false;
				if (this.events.error.length) {
					this.events.error.forEach((func) => func(elem));
				}
				return;
			}

			if (field.regExp && elem.value.length > 0) {
				let regExp = this.presets[field.regExp] ? this.presets[field.regExp] : field.regExp;
				if (!regExp.test(elem.value)) {
					this.setClass(elem, 'error');
					field.status = false;
					if (this.events.error.length) {
						this.events.error.forEach((func) => func(elem));
					}
					return;
				}
			}

			this.setClass(elem, 'correct');
			field.status = true;
			if (this.events.correct.length) {
				this.events.correct.forEach((func) => func(elem));
			}
		} else {
			field.status = true;
		}
	}

	mask(e, mask, regExp = /\D/g) {
		if (e.inputType != 'deleteContentBackward' && e.inputType != 'deleteByCut' && e.inputType != 'deleteContentForward') {
			const startCursorPosition = e.target.selectionStart;
			const endCursorPosition = e.target.value.length;
			const value = e.target.value.replace(regExp, '');
			const maskValue = mask.replace(regExp, '');
			let maskCount = 0;
			
			if (maskValue.length) {
				maskCount = maskValue.length;
			}

			while (maskCount < value.length) {
				mask = mask.replace('*', value[maskCount]);
				maskCount++;
			}

			e.target.value = mask.split('*')[0];

			if (startCursorPosition != endCursorPosition) {
				e.target.selectionStart = startCursorPosition;
				e.target.selectionEnd = startCursorPosition;
			}
		}
	}

	on(event, func) {
		if (this.events[event]) {
			this.events[event].push(func);
		}
	}

	setClass(elem, status) {
		Object.keys(this.classes).forEach((className) => {
			if (className == status) {
				elem.classList.add(this.classes[className]);
			} else {
				elem.classList.remove(this.classes[className]);
			}
		})
	}

	addEvents() {
		this.params.fields.forEach((field) => {
			const elem = this.form.querySelector(field.selector);

			field.status = false;

			if (elem) {
				if (field.realTime) {
					elem.addEventListener('input', () => {
						let regExp = this.realTimePresets[field.realTimeRegExp] ? this.realTimePresets[field.realTimeRegExp] : field.realTimeRegExp;
						elem.value = elem.value.replace(regExp, '');
					})
				}

				if (this.params.focusValidate) {
					elem.addEventListener('change', () => {
						this.validateField(field);
					})
				}

				if (field.mask) {
					elem.maxLength = field.mask.length;
					if (field.maskRegExp) {
						elem.addEventListener('input', (e) => this.mask(e, field.mask, field.maskRegExp));
						elem.addEventListener('focus', (e) => this.mask(e, field.mask, field.maskRegExp));
					} else {
						elem.addEventListener('input', (e) => this.mask(e, field.mask));
						elem.addEventListener('focus', (e) => this.mask(e, field.mask));
					}
				}
			}
		})

		if (this.form) {
			this.form.addEventListener('submit', (e) => {
				this.validateForm();

				if (this.isFormCorrect) {
					if (this.events.submit.length) {
						this.events.submit.forEach((func) => func(e));
					}
				} else {
					e.preventDefault();
				}
			})
		}
	}
};

export default class Form {
	constructor(form, params) {
		this.forms = [];
		if (!(form instanceof Element)) {
			form.forEach(item => {
				if (item) {
					this.forms.push(new FormObj(item, params));
				}
			})
		} else if (form) {
			this.forms.push(new FormObj(form, params));
		}
	}

	on(event, func) {
		this.forms.forEach(item => {
			item.on(event, func);
		})
	}
}