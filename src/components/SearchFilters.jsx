import { useContext, useMemo } from 'react';
import AppContext from '../Context/appContext';

function SearchFilters() {
  const { handleNameFiltered, NameFiltered,
    handleComparasionSelect, filterCallback, valueInput,
    apiResults, apiFilter, columnOptions, handleRemoveFilters,
    handleValueInput, handleColumnSelect,
    handleColumnSortRadio, handleColumnSort, handleSort,
  } = useContext(AppContext);

  const apiResultsFiltered = useMemo(() => (apiFilter.length === 0 ? apiResults
    : apiFilter), [apiFilter, apiResults]);

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
          <select
            name="column-filter"
            id="column-filter"
            data-testid="column-filter"
            onChange={ handleColumnSelect }
          >
            {columnOptions.map((columnOption) => (
              <option
                key={ columnOption }
                value={ columnOption }
              >
                { columnOption }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador:
          <select
            name="comparison-filter"
            id="comparison-filter"
            data-testid="comparison-filter"
            onChange={ handleComparasionSelect }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            data-testid="value-filter"
            type="number"
            id="value-filter"
            name="value-filter"
            value={ valueInput }
            onChange={ handleValueInput }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => filterCallback(apiResultsFiltered) }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleRemoveFilters }
        >
          Remover Filtros
        </button>
      </section>
      <section>
        <label htmlFor="column-sort">
          Ordenar:
          <select
            id="column-sort"
            data-testid="column-sort"
            onChange={ handleColumnSort }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <div onChange={ handleColumnSortRadio }>
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            id="column-sort-input-asc"
            name="column-sort-input"
            value="ASC"
          />
          ASC
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            id="column-sort-input-desc"
            name="column-sort-input"
            value="DESC"
          />
          DESC
        </div>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          Ordenar
        </button>
      </section>
    </div>
  );
}

export default SearchFilters;
