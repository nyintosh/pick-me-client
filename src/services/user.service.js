import { USER_API } from './service.resource'

const axios = require('axios')

const UserService = {
	saveUser: async (user) => {
		return await axios.post(`${USER_API}/POST`, user)
	},

	getAllUser: async () => {
		return await axios.get(`${USER_API}/GET/all`)
	},
	getUserById: async (id) => {
		return await axios.get(`${USER_API}/GET/id/${id}`)
	},
	getUserByUsername: async (username) => {
		return await axios.get(`${USER_API}/GET/username/${username}`)
	},
	getUserByEmail: async (email) => {
		return await axios.get(`${USER_API}/GET/email/${email}`)
	},

	updateUser: async (email, user) => {
		return await axios.put(`${USER_API}/PUT/email/${email}`, user)
	},

	deleteUser: async (email) => {
		return await axios.delete(`${USER_API}/DELETE/email/${email}`)
	},
}

export default UserService
