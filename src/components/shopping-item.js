/**
 * External dependencies.
 */
import React from 'react'

export default function ShoppingItem (props) {
	const { item, onToggle, onDelete } = props;


	return(

		<div className="shopping-item">
		<i
			className="fal fa-2x fa-check-circle"
			style={{color: item.complete && "green"}}
			onClick={ () => onToggle(item.id)}
		/>
		{item.text}
		<i
			className="fal fa-lg fa-trash delete-item"
			onClick={ () => onDelete(item.id)}
		/>
		</div>
	)
}