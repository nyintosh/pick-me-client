import { PROJECT_API } from './service.resource'

const axios = require('axios')

const ProjectService = {
	save: async (project) => {
		return await axios.post(`${PROJECT_API}/POST`, project)
	},

	// BEGIN: PURE PROJECT CTR
	getAllByLimitOrderByRandom: async (type, limit, id) => {
		return await axios.get(`${PROJECT_API}/GET/type/${type}/limit/${limit}/random/exceptId/${id}`)
	},
	getAllByLimitDescOrder: async (type, limit) => {
		return await axios.get(`${PROJECT_API}/GET/type/${type}/limit/${limit}/desc`)
	},
	getAllByTypeDescOrder: async (type) => {
		return await axios.get(`${PROJECT_API}/GET/type/${type}/desc`)
	},
	getById: async (id) => {
		return await axios.get(`${PROJECT_API}/GET/id/${id}`)
	},
	getByUserIdAndType: async (userId, type) => {
		return await axios.get(`${PROJECT_API}/GET/userId/${userId}/type/${type}/desc`)
	},
	getAll: async () => {
		return await axios.get(`${PROJECT_API}/GET/all`)
	},

	updateById: async (id, project) => {
		return await axios.put(`${PROJECT_API}/PUT/id/${id}`, project)
	},

	deleteById: async (id) => {
		return await axios.delete(`${PROJECT_API}/DELETE/id/${id}`)
	},
	// END: PURE PROJECT CTR

	// BEGIN: VOTING
	saveVote: async (vote) => {
		return await axios.post(`${PROJECT_API}/POST/vote`, vote)
	},

	getVoteCountByPid: async (pid) => {
		return await axios.get(`${PROJECT_API}/GET/vote/pid/${pid}`)
	},
	getUserVoteIdByPid: async (pid) => {
		return await axios.get(`${PROJECT_API}/GET/userVoteId/pid/${pid}`)
	},

	deleteVoteByUidAndPid: async (uid, pid) => {
		return await axios.delete(`${PROJECT_API}/DELETE/vote/userId/${uid}/projectId/${pid}`)
	},
	// END: VOTING
}

export default ProjectService
