/**
 * External dependencies.
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function ShoppingItem(props) {

	const { item, onToggle, onUpdate, onDelete } = props;

	const [isEdit, setEdit] = useState(false);
	const [itemText, setText] = useState(item.text);

	/**
	 * Handle input field value.
	 *
	 * @param  {Object} e
	 * @return {Void}
	 */
	const handleChange = e => {
		setText(e.target.value)
	}

	/**
	 * Handle double click.
	 *
	 * @param  {Object} e
	 * @return {Void}
	 */
	const handleDoubleClick = e => {
		setEdit(true);
	}

	/**
	 * Handle the lost focus on input.
	 *
	 * @param  {Object} e
	 * @return {void}
	 */
	const handleInputBlur = e => {
		setEdit(false)
	}

	/**
	 * Handle user submit.
	 *
	 * @param  {Object} e
	 * @return {Void}
	 */
	const handleSubmit = e => {
		e.preventDefault();
 		onUpdate({...item, text:itemText});
 		setEdit(false);
	}

	return(
			<div
				className="shopping-item"
				style={{background: item.complete && "#fafafa"}}
			>
				<i
					className="fal fa-2x fa-check-circle"
					style={{color: item.complete && "green"}}
					onClick={ () => onToggle(item.id)}
				/>

				{! isEdit ? (
					<div
						className="item-text"
						style={{textDecoration: item.complete && "line-through"}}
						onDoubleClick={handleDoubleClick}
					>
						{item.text}
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							value={itemText}
							onChange={handleChange}
							onBlur={handleInputBlur}
							autoFocus
						/>
					</form>
				)}

				<i
					className="fal fa-lg fa-trash delete-item"
					onClick={ () => onDelete(item.id)}
				/>
			</div>
	)
}

ShoppingItem.propTypes = {
	/**
	 * Item data.
	 *
	 * @type {Object}
	 */
	item: PropTypes.object,

	/**
	 * Toggle complete on item.
	 *
	 * @type {Function}
	 */
	onToggle: PropTypes.func,

	/**
	 * Update on item.
	 *
	 * @type {Function}
	 */
	onUpdate: PropTypes.func,

	/**
	 * Delete an item.
	 *
	 * @type {Function}
	 */
	onDelete: PropTypes.func,
}