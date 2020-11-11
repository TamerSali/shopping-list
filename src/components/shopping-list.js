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
	const [stateFilter, setFilter] = useState("all");;


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
	const handleToggleAll = status => {
		const lastStateOfItems = stateItems.map(item => {
			return {...item, complete: status}
		});
		updateItems(lastStateOfItems);
	}
	const handleDelete = id => {
		const lastStateOfItems = stateItems.filter(item => item.id !== id);
		updateItems(lastStateOfItems)
	}
	const handleClearAll = e => {
		const lastStateOfItems = stateItems.filter(item => ! item.complete);
		updateItems(lastStateOfItems);
	}

	const allItems = stateItems;
	const activeItems = stateItems.filter(item => ! item.complete);
	const completedItems = stateItems.filter(item => item.complete);

	const filteredItems = {
		"all": allItems,
		"active": activeItems,
		"completed": completedItems,
	};

	const filterItemsBy = Object.keys(filteredItems);

	const shopItems = filteredItems[stateFilter] || [];

	return(
		<div className="shopping-list">
			<ShoppingForm
				checkItems={stateItems}
				onSubmit={handleItemAdd}
				onSelectAll={handleToggleAll}
			/>

			{!shopItems.length && (
				<div className="empty-list">No Items Here</div>
			)}

			{shopItems.map(item => (
				<ShoppingItem
					key={item.id}
					item={item}
					onToggle={handleToggleComplete}
					onDelete={handleDelete}

				/>
			))}

			<div className="list-filters">
				<div className="item-has-left">
					{stateItems.filter(item => ! item.complete).length} item left
				</div>

				{filterItemsBy.map(condition => (
					<button
						key={condition}
						className={stateFilter === condition ? "is-active" : ""}
						onClick={ () => setFilter(condition)}
					>
						{condition}
					</button>
				))}

				<div className="clear-completed">
					<button
						onClick={handleClearAll}
						disabled={stateItems.some(item => item.complete) ? false : true}
					>
						Clear completed
					</button>
				</div>
			</div>

		</div>
	)
}