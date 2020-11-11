/**
 * External dependencies.
 */
import React, { Fragment } from 'react';
/**
 * Internal dependencies.
 */
import ShoppingList from './components/shopping-list.js'

function App() {

	return (
		<Fragment>
			<h1>My Shopping List</h1>
			<div className="app">
				<ShoppingList/>
			</div>
			<footer>Double-click to edit an item</footer>
		</Fragment>
	)

}

export default App;
