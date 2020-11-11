/**
 * External dependencies.
 */
import React from 'react'

export default function ShoppingForm() {
	return(
		<div className="shopping-form">
			<form>
				<i
					className="fal fa-2x fa-check-circle"
				/>
				<input
					type="text"
					placeholder="What I need ot buy today"
				/>
			</form>
		</div>
	)
}
