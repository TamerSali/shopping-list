/**
 * External dependencies.
 */
import React, { useState } from 'react'

export default function ShoppingItem (props) {
	const { item, onToggle, onUpdate, onDelete } = props;

	const [isEdit, setEdit] = useState(false);
	const [itemText, setText] = useState(item.text);

	const handleChange = e => {
		setText(e.target.value)
	}


	const handleDoubleClick = e => {
		setEdit(true);
	}


	const handleInputBlur = e => {
		setEdit(false)
	}


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