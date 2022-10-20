import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './appContext';

function AppProvider({ children }) {
  // const [gender, setGender] = useState('');
  const [apiResults, setApiResults] = useState([]);
  const [nameFiltered, setNameFiltered] = useState('');
  const options = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [columnOptions, setColumnOptions] = useState(options);
  const [columnSelect, setColumnSelect] = useState('population');
  const [comparasionSelect, setComparasionSelect] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);
  const [apiFilter, setApiFilter] = useState([]);
  const [multfilters, setMultfilters] = useState([]);

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

  const handleNameFiltered = ({ target }) => setNameFiltered(target.value);

  const handleColumnSelect = ({ target }) => setColumnSelect(target.value);

  const handleComparasionSelect = ({ target }) => setComparasionSelect(target.value);

  const handleValueInput = ({ target }) => setValueInput(target.value);

  const handleApiFilter = () => {
    if (columnSelect.length > 0
      || comparasionSelect.length > 0 || valueInput.length > 0) {
      const filterPlanet = apiResults
        ?.filter((element) => {
          switch (comparasionSelect) {
          case 'maior que':
            return Number(element[columnSelect]) > Number(valueInput);
          case 'menor que':
            return Number(element[columnSelect]) < Number(valueInput);
          default:
            return Number(element[columnSelect]) === Number(valueInput);
          }
        });
      const test = columnOptions.filter((e) => e !== columnSelect);
      console.log(test);
      setColumnOptions(test);
      setMultfilters((prev) => [...prev,
        { columnSelect, comparasionSelect, valueInput }]);
      setApiFilter(filterPlanet);
    }
  };

  const contexto = useMemo(() => ({
    apiResults,
    nameFiltered,
    columnSelect,
    valueInput,
    comparasionSelect,
    apiFilter,
    multfilters,
    columnOptions,
    handleNameFiltered,
    handleColumnSelect,
    handleComparasionSelect,
    handleValueInput,
    handleApiFilter,
  }), [apiResults, nameFiltered, columnSelect,
    comparasionSelect, valueInput, apiFilter,
    multfilters, columnOptions]);
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
