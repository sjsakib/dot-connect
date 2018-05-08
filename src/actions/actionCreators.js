import {
    UPDATE_STATE,
    UPDATE_GAME_LIST,
    CONNECTION_CHANGED
} from './actionTypes';

export function updateGameState(data) {
    return {
        type: UPDATE_STATE,
        data
    };
}

export function updateGameList(data) {
    return {
        type: UPDATE_GAME_LIST,
        data
    };
}

export function connectionUpdated(self, connected) {
    return {
        type: CONNECTION_CHANGED,
        self,
        connected
    };
}
