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

	const handleToggleAll = e => {
		const toggleSelectAll = props.checkItems.some(item => {
			return ! item.complete ? true : false;
		});
		props.onSelectAll(toggleSelectAll);
	}

	const isAllSelected = () => {
		if(!props.checkItems){
			return false;
		}
		return props.checkItems.filter(item => ! item.complete).length === 0;
	}

	return(
		<div className="shopping-form">
			<form onSubmit={handleUserSubmit}>
				<i
					className="fal fa-2x fa-check-circle"
					style={{color: isAllSelected() && "green"}}
					onClick={handleToggleAll}
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
