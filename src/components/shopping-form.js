/**
 * External dependencies.
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function ShoppingForm(props) {

	const [value, setValue] = useState("");

	/**
	 * Generate ID.
	 *
	 * @return {String}
	 */
	const getUniqueID = () => {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	}

	/**
	 * Handle input field change.
	 *
	 * @param  {Object} e
	 * @return {Void}
	 */
	const handleChange = e => {
		setValue(e.target.value)
	}

	/**
	 * Handle user submit.
	 *
	 * @param  {Object} e
	 * @return {Void}
	 */
	const handleSubmit = e => {
		e.preventDefault();
		if (value.trim() === '') {
			return;
		}
		props.onSubmit({
			id: getUniqueID(),
			text: value,
			complete: false,
		});
		setValue("");
	}

	/**
	 * Handle toggle all items.
	 *
	 * @param  {Object} e
	 * @return {Void}
	 */
	const handleToggleAll = e => {
		const toggleSelectAll = props.checkItems.some(item => {
			return ! item.complete ? true : false;
		});
		props.onSelectAll(toggleSelectAll);
	}

	/**
	 * Check for uncompleted items.
	 *
	 * @return {Boolean}
	 */
	const isAllSelected = () => {
		if (!props.checkItems.length){
			return false;
		}
		return props.checkItems.filter(item => ! item.complete).length === 0;
	}

	return(
		<div className="shopping-form">
			<form onSubmit={handleSubmit}>
				<i
					className="fal fa-2x fa-check-circle"
					style={{color: isAllSelected() && "green"}}
					onClick={handleToggleAll}
				/>
				<input
					value={value} type="text"
					placeholder="What I need ot buy today"
					onChange={handleChange}
				/>
			</form>
		</div>
	)
}

ShoppingForm.propTypes = {
	/**
	 * Items.
	 *
	 * @type {Array}
	 */
	checkItems: PropTypes.array,
	/**
	 * Handle user submit.
	 *
	 * @type {Function}
	 */
	onSubmit: PropTypes.func,

	/**
	 * Handle toggle all items.
	 *
	 * @type {Function}
	 */
	onSelectAll: PropTypes.func,

	/**
	 * Check selected items.
	 *
	 * @type {Function}
	 */
	isAllSelected: PropTypes.func,
}