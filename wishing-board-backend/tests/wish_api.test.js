const Wish = require('../models/wish')
const { initialWishes, wishesInDb, getNonExistId } = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
	await Wish.deleteMany({})
	const wishPromises = initialWishes.map(wish => new Wish(wish).save())
	await Promise.all(wishPromises)
})

//tests go here
describe('when initialize for testing database', () => {
	test('return properly format and amount', async () => {
		const wishesAtStart = await wishesInDb

		await api
			.get('/api/wishes')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const wishesAtEnd = await wishesInDb
		expect(wishesAtEnd).toHaveLength(wishesAtStart.length)
	})

	test('a specific wish is within the returned wishes', async () => {
		const response = await api.get('/api/wishes')

		const contents = response.body.map(r => r.content)
		expect(contents).toContain('Best wishes')
	})
})

describe('when add a new wish', () => {
	test('verify adding a new wish successfully', async () => {
		const newWish = {
			title: 'New Friend',
			content: 'New Wish',
		}

		const wishesAtStart = await wishesInDb

		await api
			.post('/api/wishes')
			.send(newWish)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const wishesAtEnd = await wishesInDb
		const titles = wishesAtEnd.map(wish => wish.title)

		expect(wishesAtEnd).toHaveLength(wishesAtStart.length + 1)
		expect(titles).toContain(newWish.title)
	})

	test('fails with status code 400 if data invalid', async () => {
		const newWish = {
			title: 'New Friend',
		}

		await api.post('/api/wishes').send(newWish).expect(400)

		const wishesAtEnd = await wishesInDb
		expect(wishesAtEnd).toHaveLength(initialWishes.length)
	})
})

describe('when fetch a specific wish', () => {
	test('properly fetch a specific wish', async () => {
		const wishes = await wishesInDb
		const wishToFetch = wishes[0]
		const id = wishToFetch._id

		const response = await api
			.get(`/api/wishes/${id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(JSON.parse(JSON.stringify(wishToFetch))).toEqual(response.body)
	})

	test('fail with statuscode 404 if wish does not exist', async () => {
		const nonExistId = await getNonExistId()
		console.log(nonExistId)

		await api.get(`/api/wishes/${nonExistId}`).expect(404)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
