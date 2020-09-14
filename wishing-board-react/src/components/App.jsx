// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Wish from './Wish'
import CreateArea from './CreateArea'
import wishServices from '../services/wish'

function App() {
	const [wishes, setWishes] = useState([])

	useEffect(() => {
		wishServices
			.getAll()
			.then(initialwishes => setWishes(initialwishes))
			.catch(error => console.log(error))
	}, [])

	function addWish(newWish) {
		wishServices
			.create(newWish)
			.then(response => setWishes(wishes.concat(response)))
			.catch(error => console.log(error))
	}

	function updatewish(id, newWish) {
		wishServices
			.update(id, newWish)
			.then(returnedWish => {
				setWishes(wishes.map(wish => (wish.id !== id ? wish : returnedWish)))
			})
			.catch(error => console.log(error))
	}

	function deleteWish(id) {
		wishServices
			.remove(id)
			.then(response => setWishes(wishes.filter(wish => wish.id !== id)))
			.catch(error => console.log(error))
	}

	return (
		<div className='container'>
			<div className='wrapper'>
				<Header className='header' />
				<CreateArea
					className='create'
					onAdd={addWish}
					onUpdate={updatewish}
					data={wishes}
				/>
				{wishes.map(wishItem => {
					return (
						<Wish
							key={wishItem.id}
							id={wishItem.id}
							title={wishItem.title}
							content={wishItem.content}
							onDelete={deleteWish}
						/>
					)
				})}
				<div className='push'></div>
			</div>

			<Footer />
		</div>
	)
}

export default App
