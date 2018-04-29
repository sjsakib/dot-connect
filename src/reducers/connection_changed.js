function connection_changed(state, action) {
  return {
    connected: {
      ...state.connected,
      ...{
        [state.isX === action.self ? 'x' : 'o']: action.connected,
      }
    }
  };
}

export default connection_changed
