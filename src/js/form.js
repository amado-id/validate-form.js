import Form from './_validate.js'

document.addEventListener('DOMContentLoaded', function() {
	if (document.querySelector('.form')) {
		const form = new Form(document.querySelectorAll('.form'), {
			focusValidate: true,
			fields: [
				{
					selector: '[name="name"]',
					maxLength: 32,
					realTimeRegExp: 'text',
					realTime: true,
				},
				{
					selector: '[name="phone"]',
					realTimeRegExp: 'phone',
					realTime: true,
					regExp: 'phone',
					mask: '+7 (***) ***-**-**'
				},
				{
					selector: '[name="checkbox"]',
					required: true
				}
			]
		});
	}
})