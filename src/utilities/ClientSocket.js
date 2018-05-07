import io from 'socket.io-client';
import { apiUrl } from '../config.js';
import {
    updateGameState,
    updateGameList,
    connectionUpdated
} from '../actions/actionCreators';

export default class ClientSocket {
    constructor(props) {
        this.socket = io(apiUrl);
        this.props = props;
    }

    bindListeners() {
        const { dispatch } = this.props;

        this.socket.on('CONNECTED', () =>
            dispatch(connectionUpdated(true, true))
        );
        this.socket.on('DISCONNECT', () =>
            dispatch(connectionUpdated(true, false))
        );

        this.socket.on('PEER_CONNECTED', () =>
            dispatch(connectionUpdated(false, true))
        );

        this.socket.on('PEER_DISCONNECTED', () =>
            dispatch(connectionUpdated(false, false))
        );

        this.socket.on('SYNC', data => dispatch(updateGameState(data)));

        this.socket.on('UPDATE_GAME_LIST', data =>
            dispatch(updateGameList(data))
        );

        this.socket.on('RECONNECT', () => {
            if (this.props.status === 'started') {
                console.log('rejoining...');
                this.socket.emit('REJOIN', {
                    gameId: this.props.gameId,
                    gridNodes: this.props.gridNodes,
                    xIsNext: this.props.xIsNext,
                    score: this.props.score,
                    gameStatus: this.props.gameStatus
                });
            }

            dispatch(connectionUpdated(true, true));
        });
    }

    getSocket() {
        return this.socket;
    }
}
