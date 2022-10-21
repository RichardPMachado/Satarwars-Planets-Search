import { useContext, useMemo } from 'react';
import AppContext from '../Context/appContext';

function SearchFilters() {
  const { handleNameFiltered, NameFiltered, handleColumnSelect,
    handleComparasionSelect, filterCallback, valueInput,
    apiResults, apiFilter, columnOptions, handleRemoveFilters,
    handleValueInput } = useContext(AppContext);

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
    </div>
  );
}

export default SearchFilters;
