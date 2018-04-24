import { connect } from 'react-redux'
import { nodeClicked } from '../actions'
import Game from '../components/Game'

const mapStateToProps = state => (state)

export default connect(
  mapStateToProps
)(Game)
