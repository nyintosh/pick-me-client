import ProjectService from '../services/project.service'

export const Vote = (isVoted, setIsVoted, uid, pid, votes, setVotes) => {
	const vote = { userId: uid, projectId: pid }
	let exist_uid = false

	setIsVoted(!isVoted)
	ProjectService.getUserVoteIdByPid(pid).then((res) => {
		res.data && res.data.forEach((data) => data === uid && (exist_uid = true))

		if (res.data && exist_uid) {
			ProjectService.deleteVoteByUidAndPid(uid, pid).then(() => setVotes(--votes))
		} else {
			ProjectService.saveVote(vote).then(() => setVotes(++votes))
		}
	})
}
