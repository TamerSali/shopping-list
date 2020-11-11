/**
 * External dependencies.
 */
import React, { useState, useEffect } from 'react'
/**
 * Internal dependencies.
 */
import ShoppingForm from './shopping-form'
import ShoppingItem from './shopping-item'
import { getStateFromLocalStorage, setStateInLocalStorage } from '../useLocalStorage'

const localStorageKey = "Shopping/Items"

export default function ShoppingList() {

	const [stateItems, setItems] = useState([]);
	const [stateFilter, setFilter] = useState("all");;

	/**
	 * Update the state and save it to the localStorage.
	 *
	 * @param  {Object} items
	 * @return {Void}
	 */
	const updateItems = items => {
		setItems(items);
		setStateInLocalStorage(localStorageKey, items);
	}

	/**
	 * Add new item to list.
	 *
	 * @param  {String} item
	 * @return {Void}
	 */
	const handleItemAdd = item => {
		updateItems([...stateItems,item])
	}

	/**
	 * Toggle complete.
	 *
	 * @param  {String} id
	 * @return {Void}
	 */
	const handleToggleComplete = id => {
		const lastStateOfItems = stateItems.map(item => {
			return item.id === id
				? {...item, complete: ! item.complete}
				: item;
		});
		updateItems(lastStateOfItems);
	}

	/**
	 * Toggle all items.
	 * @param  {Boolean} status
	 * @return {Void}
	 */
	const handleToggleAll = status => {
		const lastStateOfItems = stateItems.map(item => {
			return {...item, complete: status}
		});
		updateItems(lastStateOfItems);
	}

	/**
	 * Handle updated item.
	 * @param  {Object} selectedItem
	 * @return {Void}
	 */
	const handleUpdate = selectedItem => {
		const lastStateOfItems = stateItems.map(item =>{
			return  selectedItem.id === item.id
				? selectedItem
				: item;
		})
		updateItems(lastStateOfItems)
	}

	/**
	 * Remove item from list.
	 *
	 * @param  {String} id
	 * @return {Void}
	 */
	const handleDelete = id => {
		const lastStateOfItems = stateItems.filter(item => item.id !== id);
		updateItems(lastStateOfItems);
	}

	/**
	 * Remove all completed items.
	 *
	 * @return {Void}
	 */
	const handleClearAll = e => {
		const lastStateOfItems = stateItems.filter(item => ! item.complete);
		updateItems(lastStateOfItems);
	}

	useEffect(() =>  {
		const localStorageItems = getStateFromLocalStorage(localStorageKey);
		setItems(localStorageItems ? localStorageItems : []);
	},[]);

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
				onSelectAll={handleToggleAll}
				onSubmit ={handleItemAdd}
			/>

			{! shopItems.length && (
				<div className="empty-list"> No Items Here </div>
			)}

			{shopItems.map(item => (
				<ShoppingItem
					key={item.id}
					item={item}
					onToggle={handleToggleComplete}
					onUpdate={handleUpdate}
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