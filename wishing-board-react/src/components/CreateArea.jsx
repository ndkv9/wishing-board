import React, { useState } from 'react'
import CheckIcon from '@material-ui/icons/Check'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'

function CreateArea(props) {
	const [isExpanded, setExpanded] = useState(false)

	const [wish, setWish] = useState({
		title: '',
		content: '',
	})

	function handleChange(event) {
		const { name, value } = event.target

		setWish(prevWish => {
			return {
				...prevWish,
				[name]: value,
			}
		})
	}

	function submitWish(event) {
		if (
			props.data.map(returnedwish => returnedwish.title).includes(wish.title)
		) {
			const id = props.data.find(result => result.title === wish.title).id
			props.onUpdate(id, wish)
			setWish({
				title: '',
				content: '',
			})

			console.log('dublicated')
		} else {
			props.onAdd(wish)
			setWish({
				title: '',
				content: '',
			})

			console.log('Added')
		}

		event.preventDefault()
	}

	function expand() {
		setExpanded(true)
	}

	return (
		<div>
			<form className='create-wish' onSubmit={submitWish}>
				{isExpanded && (
					<input
						name='title'
						onChange={handleChange}
						value={wish.title}
						spellCheck={false}
						autoFocus={true}
						placeholder='From...'
					/>
				)}

				<textarea
					name='content'
					onClick={expand}
					onChange={handleChange}
					value={wish.content}
					spellCheck={false}
					placeholder='Make a wish...'
					rows={isExpanded ? 3 : 1}
				/>
				<Zoom in={isExpanded}>
					<Fab type='submit'>
						<CheckIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	)
}

export default CreateArea
