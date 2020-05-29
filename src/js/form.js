import Form from './_validate.js'

document.addEventListener('DOMContentLoaded', function() {
	if (document.querySelector('.form')) {
		const form = new Form(document.querySelectorAll('.form'), {
			focusValidate: true,
			fields: [
				{
					fieldName: 'name',
					maxLength: 32,
					realTimeRegExp: 'text',
					realTime: true,
					required: true
				},
				{
					fieldName: 'phone',
					realTimeRegExp: 'phone',
					realTime: true,
					required: true,
					mask: '+7 (***) ***-**-**'
				},
				{
					fieldName: 'checkbox',
					required: true
				}
			]
		});

		form.on('submit', function(e) {
			e.preventDefault()
		})
	}
})