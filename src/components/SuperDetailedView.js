import React from 'react';
import {useParams} from 'react-router-dom';

function SuperDetailedView({pokemon}) {
    const {id, info} = useParams();

  return (
    <div>
    {`Super Detailed View of pokemon with id ${id} and ${info}`}
    </div>
  )
}

export default SuperDetailedView
