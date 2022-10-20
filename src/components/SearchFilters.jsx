import { useContext } from 'react';
import AppContext from '../Context/appContext';

function SearchFilters() {
  const { handleNameFiltered, NameFiltered } = useContext(AppContext);
  return (
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
  );
}

export default SearchFilters;
