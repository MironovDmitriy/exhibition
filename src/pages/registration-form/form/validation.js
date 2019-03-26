const validation = values => {

	let errors = {};

	if (!values.surname) {
		errors.surname = 'Required';
	};

	if (!values.name) {
		errors.name = 'Required';
	};

	if (!values.lastname) {
		errors.lastname = 'Required';
	};

	if (!values.company) {
		errors.company = 'Required';
	};

	if (!values.post) {
		errors.post = 'Required';
	};

	if (!values.activity_field.value) {
		errors.activity_field = 'error';
	};

		if (!values.phone) {
		errors.phone = 'Required';
	};

	if (!values.email) {
		errors.email = 'Required';
	};

	if (!values.photo) {
		errors.photo = 'Required';
	};

	return errors;
};

export default validation;