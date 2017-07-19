import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { createSelector as ormCreateSelector } from 'redux-orm'
import { get, includes, isEmpty } from 'lodash/fp'
import orm from 'store/models'
import { FETCH_POSTS } from 'store/constants'
import { fetchPosts, storeFeedListProps } from './FeedList.store.js'
import { makeGetQueryResults } from 'store/reducers/queryResults'

export function mapStateToProps (state, props) {
  return {
    posts: getPosts(state, props),
    hasMore: getHasMorePosts(state, props),
    pending: state.pending[FETCH_POSTS]
  }
}

export const mapDispatchToProps = function (dispatch, props) {
  const { slug, networkSlug, sortBy, filter, subject, topic } = props
  const search = null // placeholder; no need for this yet
  function dispatchFetchPosts (offset) {
    return dispatch(fetchPosts({subject, slug, networkSlug, sortBy, offset, search, filter, topic}))
  }
  return {
    fetchPosts: dispatchFetchPosts,
    // We are putting a callback into appstate so components (ie Navigation,
    // TopicNav) can drop the queryResults and re-fetch posts
    storeFeedListPropsMaker: props => () => dispatch(storeFeedListProps(props))
  }
}

export function mergeProps (stateProps, dispatchProps, ownProps) {
  const { storeFeedListPropsMaker } = dispatchProps
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    storeFeedListProps: storeFeedListPropsMaker(ownProps)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)

const getPostResults = makeGetQueryResults(FETCH_POSTS)

export const getPosts = ormCreateSelector(
  orm,
  state => state.orm,
  getPostResults,
  (session, results) => {
    if (isEmpty(results) || isEmpty(results.ids)) return []
    return session.Post.all()
    .filter(x => includes(x.id, results.ids))
    .orderBy(x => results.ids.indexOf(x.id))
    .toModelArray()
    .map(post => ({
      ...post.ref,
      creator: post.creator,
      linkPreview: post.linkPreview,
      commenters: post.commenters.toModelArray(),
      communities: post.communities.toModelArray()
    }))
  }
)

const getHasMorePosts = createSelector(getPostResults, get('hasMore'))
