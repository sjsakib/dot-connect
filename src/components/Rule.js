import React from 'react';
import { Link } from 'react-router-dom';


const Rules = () => (
  <div>
    <p>
      Each player in turn connects dots. 
      Click dots to connect them.
      If your connection makes a box, you get a point and another move.
      You can't pass move.
      Whoever gets most points wins.
    </p>
    <button className="button is-primary back">
        <Link to="/"> Go Back </Link>
    </button>
  </div>
)

export default Rules
