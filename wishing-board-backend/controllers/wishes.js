const wishesRouter = require('express').Router()
const Wish = require('../models/wish')
require('express-async-errors')

// read all DB
wishesRouter.get('/', async (req, res) => {
	const response = await Wish.find({})
	const initialWishes = response.map(wish => wish.toJSON())
	res.json(initialWishes)
})

// create new DB document
wishesRouter.post('/', async (req, res) => {
	const { title, content } = req.body
	const wish = new Wish({
		title,
		content,
	})

	const newWish = await wish.save()
	const returnedwish = newWish.toJSON()
	res.json(returnedwish)
})

// fetch a single DB document
wishesRouter.get('/:id', async (req, res) => {
	const id = req.params.id
	const wish = await Wish.findById(id)
	if (!wish) return res.status(404).json({ error: 'nonexist data' })
	const returnedwish = wish.toJSON()
	res.json(returnedwish)
})

// delete a single DB document
wishesRouter.delete('/:id', async (req, res) => {
	const id = req.params.id
	await Wish.findByIdAndDelete(id)
	res.status(204).end()
})

// update a single DB document
wishesRouter.put('/:id', async (req, res) => {
	const id = req.params.id
	const { title, content } = req.body
	const wish = {
		title,
		content,
	}

	const response = await Wish.findByIdAndUpdate(id, wish, { new: true })
	const returnedwish = response.toJSON()
	res.json(returnedwish)
})

module.exports = wishesRouter
