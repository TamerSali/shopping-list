/**
 * External dependencies.
 */
import React from 'react'

export default function ShoppingItem (props) {
	const { item } = props;

	return(

		<div className="shopping-item">
			{item.text}
		</div>
	)
}