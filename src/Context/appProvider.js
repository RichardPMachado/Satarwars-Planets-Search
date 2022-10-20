import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './appContext';

function AppProvider({ children }) {
  // const [gender, setGender] = useState('');
  const [apiResults, setApiResults] = useState([]);
  const [nameFiltered, setNameFiltered] = useState('');
  const [columnSelect, setColumnSelect] = useState('population');
  const [comparasionSelect, setComparasionSelect] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);
  const [apiFilter, setApiFilter] = useState([]);

  // const handleApiResults = ({target}) => {
  //   setName(target.name)
  // }

  // const handleGender = ({target}) => {
  //   setGender(target.gender)
  // }
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
    const filterPlanet = apiResults
      .filter((element) => {
        switch (comparasionSelect) {
        case 'maior que':
          return Number(element[columnSelect]) > Number(valueInput);
        case 'menor que':
          return Number(element[columnSelect]) < Number(valueInput);
        case 'igual a':
          return Number(element[columnSelect]) === Number(valueInput);
        default:
          return element;
        }
      });
    setApiFilter(filterPlanet);
  };

  const contexto = useMemo(() => ({
    apiResults,
    nameFiltered,
    columnSelect,
    valueInput,
    comparasionSelect,
    apiFilter,
    handleNameFiltered,
    handleColumnSelect,
    handleComparasionSelect,
    handleValueInput,
    handleApiFilter,
  }), [apiResults, nameFiltered, columnSelect,
    comparasionSelect, valueInput, apiFilter]);
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
