import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './appContext';

function AppProvider({ children }) {
  const [apiResults, setApiResults] = useState([]);
  const [nameFiltered, setNameFiltered] = useState('');
  const [columnSelect, setColumnSelect] = useState('population');
  const [comparasionSelect, setComparasionSelect] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);
  const [apiFilter, setApiFilter] = useState([]);
  const [multfilters, setMultfilters] = useState([]);
  const [columnOptions, setColumnOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const handleNameFiltered = ({ target }) => setNameFiltered(target.value);

  const handleColumnSelect = ({ target }) => setColumnSelect(target.value);

  const handleComparasionSelect = ({ target }) => setComparasionSelect(target.value);

  const handleValueInput = ({ target }) => setValueInput(target.value);

  const handleApiFilter = (arrApiFilter) => {
    let elementColumn = '';
    const filterPlanet = arrApiFilter
      ?.filter((element) => {
        elementColumn = columnSelect;
        switch (comparasionSelect) {
        case 'maior que':
          return Number(element[columnSelect]) > Number(valueInput);
        case 'menor que':
          return Number(element[columnSelect]) < Number(valueInput);
        default:
          return Number(element[columnSelect]) === Number(valueInput);
        }
      });
    setApiFilter(filterPlanet);
    setMultfilters((prev) => [...prev,
      { columnSelect, comparasionSelect, valueInput }]);
    const newOptions = columnOptions.filter((element) => element !== elementColumn);
    setColumnOptions(newOptions);
    setColumnSelect(newOptions[0]);
  };

  const filterCallback = useCallback(handleApiFilter, [columnSelect, columnOptions,
    comparasionSelect, valueInput]);

  // useEffect(() => {
  //   setColumnOptions(columnOptions[0]);
  // }, [columnOptions]);

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();
        setApiResults(results?.map((e) => {
          delete e.residents;
          return e;
        }));
      } catch (error) {
        throw new Error(error);
      }
    };
    requestAPI();
  }, []);

  const contexto = useMemo(() => ({
    apiResults,
    nameFiltered,
    columnSelect,
    valueInput,
    comparasionSelect,
    apiFilter,
    multfilters,
    columnOptions,
    filterCallback,
    handleNameFiltered,
    handleColumnSelect,
    handleComparasionSelect,
    handleValueInput,
  }), [apiResults, nameFiltered, columnSelect,
    comparasionSelect, valueInput, apiFilter,
    multfilters, columnOptions, filterCallback]);
  return (
    <AppContext.Provider value={ contexto }>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
