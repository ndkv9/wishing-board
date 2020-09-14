const Wish = require('../models/wish')

const initialWishes = [
	{
		title: 'Your Friend',
		content: 'Have a nice day',
	},

	{
		title: 'Another Friend',
		content: 'Best wishes',
	},
]

const wishesInDb = Wish.find({})

const getNonExistId = async () => {
	const wish = new Wish({
		title: 'will be removed',
		content: 'Nothing',
	})

	await wish.save()
	await wish.remove()

	return wish._id.toString()
}

module.exports = { initialWishes, wishesInDb, getNonExistId }
