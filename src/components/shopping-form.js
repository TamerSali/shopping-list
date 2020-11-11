/**
 * External dependencies.
 */
import React, { useState } from 'react'

export default function ShoppingForm (props) {
	const [value, setValue] = useState("");

	const getUniqueID = () => {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	}

	const handleInputChange = e => {
		setValue(e.target.value)
	}

	const handleUserSubmit = e => {
		e.preventDefault();

		if (value.trim() === "") {
			return;
		}

		props.onSubmit({
			id: getUniqueID(),
			text: value,
			complete: false,
		});
		setValue("");
	}

	return(
		<div className="shopping-form">
			<form onSubmit={handleUserSubmit}>
				<i
					className="fal fa-2x fa-check-circle"
				/>
				<input
					type="text"
					value={value}
					onChange={handleInputChange}
					placeholder="What I need ot buy today"
				/>
			</form>
		</div>
	)
}
