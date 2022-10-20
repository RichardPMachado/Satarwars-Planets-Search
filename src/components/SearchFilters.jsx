import { useContext } from 'react';
import AppContext from '../Context/appContext';

function SearchFilters() {
  const { handleNameFiltered, NameFiltered } = useContext(AppContext);
  return (
    <div>
      <div className="input-name-filtered">
        <label htmlFor="name-filter">
          Filtrar por Nome:
          <input
            data-testid="name-filter"
            type="text"
            id="name-filter"
            name="name-filter"
            value={ NameFiltered }
            onChange={ handleNameFiltered }
          />
        </label>
      </div>
      <section>
        <label htmlFor="column-filter">
          Coluna:
          <select name="column-filter" id="column-filter" data-testid="column-filter">
            <option value="">population</option>
            <option value="">orbital_period</option>
            <option value="">diameter</option>
            <option value="">rotation_period</option>
            <option value="">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador:
          <select
            name="comparison-filter"
            id="comparison-filter"
            data-testid="comparison-filter"
          >
            <option value="">maior que</option>
            <option value="">menor que</option>
            <option value="">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            data-testid="value-filter"
            type="number"
            id="value-filter"
            name="value-filter"
            value={ NameFiltered }
            onChange={ handleNameFiltered }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </section>
    </div>
  );
}

export default SearchFilters;
