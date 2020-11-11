/**
 * External dependencies.
 */
import React, { useState, useEffect } from 'react'
/**
 * Internal dependencies.
 */
import ShoppingForm from './shopping-form'
import ShoppingItem from './shopping-item'
import { setStateInLocalStorage, getStateFromLocalStorage } from '../useLocalStorage'

const localStorageKey = "Shopping/Items"

export default function ShoppingList() {
	const [stateItems, setItems] = useState([]);

	useEffect(() => {
		const localStorageItems = getStateFromLocalStorage(localStorageKey);
		setItems(localStorageItems ? localStorageItems : []);
	}, [] )

	const updateItems = items => {
		setItems(items);
		setStateInLocalStorage(localStorageKey, items);
	}
	const handleItemAdd = item => {
		updateItems([...stateItems,item]);
	}
	const handleToggleComplete = id => {
		const lastStateOfItems = stateItems.map(item => {
			return item.id === id
				? {...item, complete: ! item.complete}
				: item;
		});
		updateItems(lastStateOfItems)
	}
	const handleDelete = id => {
		const lastStateOfItems = stateItems.filter(item => item.id !== id);
		updateItems(lastStateOfItems)
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