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
	const handleToggleComplete = id => {
		const lastStateOfItems = stateItems.map(item => {
			return item.id === id
				? {...item, complete: ! item.complete}
				: item;
		});
		setItems(lastStateOfItems);
	}
	const handleDelete = id => {
		const lastStateOfItems = stateItems.filter(item => item.id !== id);
		setItems(lastStateOfItems);
	}

	return(
		<div className="shopping-list">
			<ShoppingForm onSubmit={handleItemAdd}/>

			{!stateItems.length && (
				<div className="empty-list">No Items Here</div>
			)}

			{stateItems.map(item => (
				<ShoppingItem
					key={item.id}
					item={item}
					onToggle={handleToggleComplete}
					onDelete={handleDelete}
				/>
			))}

		</div>
	)
}