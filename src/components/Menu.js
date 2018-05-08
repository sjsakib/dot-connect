import React from 'react';
import { Link } from 'react-router-dom';

const Menu = props => {
    const { gameStatus, gameId } = props;
    return (
        <div className="box">
            <ul className="menu-list">
                {!gameStatus.includes('not started') && (
                    <li>
                        <Link to={`/game/${gameId}/play`}>Go back to game</Link>
                    </li>
                )}
                <li>
                    <Link to="/game/start">Start a new game</Link>
                </li>
                <li>
                    <Link to="/rules">Rules</Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
