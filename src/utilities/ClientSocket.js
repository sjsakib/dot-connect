import io from 'socket.io-client';
import { apiUrl } from '../config.js';
import {
    updateGameState,
    updateGameList,
} from '../actions/actionCreators';

export default class ClientSocket {
    constructor(app) {
        this.socket = io(apiUrl);
        this.app = app;
    }

    bindListeners() {
        const { dispatch } = this.app.props;

        this.socket.on('SYNC', data => dispatch(updateGameState(data)));

        this.socket.on('UPDATE_GAME_LIST', data =>
            dispatch(updateGameList(data))
        );

        this.socket.on('reconnect', () => {
            if (this.app.offline) return;
            this.socket.emit('REQUEST_GAME_INFO', {
                gameId: this.app.props.gameId,
                userID: this.app.user.id,
            });
            this.socket.emit('REJOIN', {
                gameId: this.app.props.gameId,
                userId: this.app.user.id,
            });

        });
    }

    getSocket() {
        return this.socket;
    }
}
