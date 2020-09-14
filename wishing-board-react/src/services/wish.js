import axios from 'axios'

const baseUrl = '/api/wishes'

const getAll = async () => {
	const request = await axios.get(baseUrl)
	return request.data
}

const create = async wish => {
	const request = await axios.post(baseUrl, wish)
	return request.data
}

const update = async (id, wish) => {
	const request = await axios.put(`${baseUrl}/${id}`, wish)
	return request.data
}

const remove = async id => {
	const request = await axios.delete(`${baseUrl}/${id}`)
	return request.data
}

export default { getAll, remove, create, update }
