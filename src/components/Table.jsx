import React, { useContext } from 'react';
import AppContext from '../Context/appContext';

export default function Table() {
  const { apiResults } = useContext(AppContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          apiResults.map(({
            name,
            rotation_period: rotation,
            orbital_period: orbital,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: water,
            population,
            films,
            created,
            edited,
            url,
          }) => (
            <tr key={ name }>
              <td>{ name }</td>
              <td>{ rotation }</td>
              <td>{ orbital }</td>
              <td>{ diameter }</td>
              <td>{ climate }</td>
              <td>{ gravity }</td>
              <td>{ terrain }</td>
              <td>{ water }</td>
              <td>{ population }</td>
              <td>
                <ul>
                  {films.map((e) => (
                    <li key={ `${e}` }>{ e }</li>
                  ))}
                </ul>
              </td>
              <td>{ created }</td>
              <td>{ edited }</td>
              <td>{ url }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
