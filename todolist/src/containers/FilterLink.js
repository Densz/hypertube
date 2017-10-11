// FilterLink gets the current visibility filter and renders a Link.
//    . filter: string is the visibility filter it represents.
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
// Car on va appliquer les changements ici, ou grace a ces components
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink