import React, { useContext, useMemo } from 'react';
import AppContext from '../Context/appContext';

function Table() {
  const { apiResults, nameFiltered } = useContext(AppContext);

  // ===================== Técnica de como Filtrar pesquisa com otimização =====================

  const apiResultsFiltered = useMemo(() => {
    const LowerSearch = nameFiltered.toLowerCase();
    return apiResults?.filter(({ name }) => name
      .toLowerCase().includes(LowerSearch));
  }, [apiResults, nameFiltered]);
  // referencia para fazer o filtro com performance https://www.youtube.com/watch?v=5Tq4-UgPTDs

  // ============================================================================================
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
          apiResultsFiltered.map(({
            name,
            rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: suefaceWater,
            population,
            films,
            created,
            edited,
            url,
          }) => (
            <tr key={ name }>
              <td>{ name }</td>
              <td>{ rotationPeriod }</td>
              <td>{ orbitalPeriod }</td>
              <td>{ diameter }</td>
              <td>{ climate }</td>
              <td>{ gravity }</td>
              <td>{ terrain }</td>
              <td>{ suefaceWater }</td>
              <td>{ population }</td>
              <td>
                <ul>
                  {films?.map((e) => (
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

export default React.memo(Table);
