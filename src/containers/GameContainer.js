import { connect } from 'react-redux'
import { nodeClicked } from '../actions'
import Game from '../components/Game'

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
  nodeClicked: node => dispatch(nodeClicked(node))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game)
