/**
 * External dependencies.
 */
import React, { Fragment } from 'react';
/**
 * Internal dependencies.
 */
import ShoppingList from './components/shopping-list'

function App() {

	return (
		<Fragment>
			<h1>My Shopping List</h1>
			<div className="app">
				<ShoppingList/>
			</div>
		</Fragment>
	)

}

export default App;
