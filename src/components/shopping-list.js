/**
 * External dependencies.
 */
import React, { useState } from 'react'
/**
 * Internal dependencies.
 */
import ShoppingForm from './shopping-form'
import ShoppingItem from './shopping-item'

export default function ShoppingList() {
	const [stateItems, setItems] = useState([]);

	const handleItemAdd = item => {
		setItems([...stateItems,item]);
	}

	return(
		<div className="shopping-list">
			<ShoppingForm onSubmit={handleItemAdd}/>
			{!stateItems.length && (
				<div className="empty-list">No Items Here</div>
			)}

			{stateItems.map(item => (
				<ShoppingItem key={item.id} item={item} />
			))}
		</div>
	)
}