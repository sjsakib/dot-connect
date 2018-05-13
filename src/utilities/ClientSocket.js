import io from 'socket.io-client';
import { apiUrl } from '../config.js';
import {
    updateGameState,
    updateGameList,
} from '../actions/actionCreators';

export default class ClientSocket {
    constructor(props, user) {
        this.socket = io(apiUrl);
        this.props = props;
        this.user = user;
    }

    bindListeners() {
        const { dispatch } = this.props;

        this.socket.on('SYNC', data => dispatch(updateGameState(data)));

        this.socket.on('UPDATE_GAME_LIST', data =>
            dispatch(updateGameList(data))
        );

        this.socket.on('reconnect', () => {
            console.log(this.props);
            this.socket.emit('REQUEST_GAME_INFO', {
                gameId: this.props.gameId,
                userID: this.user.id,
            });
            this.socket.emit('REJOIN', {
                gameId: this.props.gameId,
                userId: this.user.id,
            });

        });
    }

    getSocket() {
        return this.socket;
    }
}
