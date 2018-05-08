import React from 'react';
import { Link } from 'react-router-dom';

const PublicGameList = props => {
    const gameList = props.games || [];
    const ListItems = gameList.map(game => (
        <tr key={game.gameId}>
            <td>{game.players.x}</td>
            <td>{`${game.size.r}x${game.size.c}`}</td>
            <td>
                <span className="button is-link is-small">
                    <Link to={`/game/${game.gameId}/join`}>Join</Link>
                </span>
            </td>
        </tr>
    ));

    return (
        <div>
            {gameList.length > 0 && (
                <div>
                    <p className="subtitle has-text-grey">
                        {' '}
                        Following games are available to join
                    </p>
                    <table className="table is-centered game-table">
                        <thead>
                            <tr>
                                <td>Challenger</td>
                                <td>Size</td>
                            </tr>
                        </thead>
                        <tbody>{ListItems}</tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PublicGameList;
