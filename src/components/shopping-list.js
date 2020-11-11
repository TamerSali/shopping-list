/**
 * External dependencies.
 */
import React from 'react'
/**
 * Internal dependencies.
 */
import ShoppingForm from './shopping-form'
import ShoppingItem from './shopping-item'

export default function ShoppingList() {

	return(
		<div className="shopping-list">
			<ShoppingForm/>
			<ShoppingItem/>
		</div>
	)
}