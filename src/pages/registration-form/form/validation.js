const validation = values => {

	let errors = {};

	if (!values.surname) {
		errors.surname = 'Required';
	};

	if (!values.name) {
		errors.name = 'Required';
	};

	if (!values.patronymic) {
		errors.patronymic = 'Required';
	};

	if (!values.companyName) {
		errors.companyName = 'Required';
	};

	if (!values.position) {
		errors.position = 'Required';
	};

	if (!values.fieldOfActivity.value) {
		errors.fieldOfActivity = 'error';
	};

		if (!values.phoneNumber) {
		errors.phoneNumber = 'Required';
	};

	if (!values.eMail) {
		errors.eMail = 'Required';
	};

	if (!values.photoUpload) {
		errors.photoUpload = 'Required';
	};

	return errors;
};

export default validation;