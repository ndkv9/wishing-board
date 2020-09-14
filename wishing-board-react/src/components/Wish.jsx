import React from 'react'
import BackspaceIcon from '@material-ui/icons/Backspace'

function Wish(props) {
	function handleClick() {
		props.onDelete(props.id)
	}

	return (
		<div className='wish'>
			<h2>{props.title}</h2>
			<p>
				<em>{props.content}</em>
			</p>
			<button onClick={handleClick}>
				<BackspaceIcon />
			</button>
		</div>
	)
}

export default Wish
