import React from 'react';

const NotFound404 =({location}) => (
	<div className="notFound">
		<h2>Страница по адресу {location.pathname} не найдена</h2>
	</div>
);

export default NotFound404;