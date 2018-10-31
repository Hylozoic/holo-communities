import { createSelector as ormCreateSelector } from 'redux-orm'
import { compact } from 'lodash/fp'
import orm from 'store/models'
import { presentPost } from 'store/selectors/getPost'
import { FETCH_MEMBER_VOTES } from '../MemberProfile.store'

const memberVotesQuery =
`query MemberVotes ($id: ID, $order: String, $limit: Int) {
  person (id: $id) {
    id
    votes (first: $limit, order: $order) {
      items {
        id
        post {
          id
          title
          details
          type
          creator {
            id
          }
          commenters {
            id,
            name,
            avatarUrl
          }
          commentersTotal
          communities {
            id
            name
          }
          createdAt
        }
        voter {
          id
        }
        createdAt
      }
    }
  }
}`

export function fetchMemberVotes (id, order = 'desc', limit = 20, query = memberVotesQuery) {
  return {
    type: FETCH_MEMBER_VOTES,
    graphql: {
      query,
      variables: { id, limit, order }
    },
    meta: { extractModel: 'Person' }
  }
}

export const getMemberVotes = ormCreateSelector(
  orm,
  state => state.orm,
  (_, { personId }) => personId,
  ({ Vote }, personId) => {
    const votes = Vote.filter(v => String(v.voter) === String(personId)).toModelArray()
    if (!votes) return []
    return compact(votes.map(({ post }) => {
      if (!post) return
      return presentPost(post)
    }))
  }
)
