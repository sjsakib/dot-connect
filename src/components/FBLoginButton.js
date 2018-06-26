import React, { Component } from 'react';

class FBLoginButton extends Component {

	componentDidMount() {
		if (typeof window.FB !== 'undefined') {
			window.FB.XFBML.parse();
		}
	}

	render() {
		return (
			<div
				className="fb-login-button"
				data-max-rows="1"
				data-size="medium"
				data-button-type="continue_with"
				data-show-faces="false"
				data-auto-logout-link="true"
				data-use-continue-as="true"
				data-scope="public_profile"
			/>
		);
	}
}

export default FBLoginButton;
