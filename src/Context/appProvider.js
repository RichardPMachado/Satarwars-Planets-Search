import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './appContext';

function AppProvider({ children }) {
  // const [gender, setGender] = useState('');
  const [apiResults, setApiResults] = useState([]);
  const [nameFiltered, setNameFiltered] = useState('');

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

  const contexto = useMemo(() => ({
    apiResults,
    nameFiltered,
    handleNameFiltered,
  }), [apiResults, nameFiltered]);
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
