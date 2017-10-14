import React from 'react';


export const LoadingIndicator = () =>
	[
		<i key={1} className="fa fa-circle-o-notch fa-spin fa-fw text-info m-2"/>,
		<span key={2} className="sr-only">Loading...</span>
	];