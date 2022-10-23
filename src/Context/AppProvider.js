import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [apiResults, setApiResults] = useState([]);
  const [nameFiltered, setNameFiltered] = useState('');
  const [columnOptions, setColumnOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [columnSelect, setColumnSelect] = useState(columnOptions[0]);
  const [comparasionSelect, setComparasionSelect] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);
  const [apiFilter, setApiFilter] = useState([]);
  const [multfilters, setMultfilters] = useState([]);
  // const [OrdenaFilter, setOrdenaFilter] = useState([]);
  const [columnSortRadio, setColumnSortRadio] = useState([]);
  const [columnSort, setColumnSort] = useState('population');

  const handleNameFiltered = ({ target }) => setNameFiltered(target.value);

  const handleColumnSelect = ({ target }) => setColumnSelect(target.value);

  const handleComparasionSelect = ({ target }) => setComparasionSelect(target.value);

  const handleValueInput = ({ target }) => setValueInput(target.value);

  const handleColumnSortRadio = ({ target }) => setColumnSortRadio(target.value);

  const handleColumnSort = ({ target }) => setColumnSort(target.value);

  const handleSort = () => {
    let aux = [];
    let newArr = [];
    apiResults.forEach((e) => {
      if (e[columnSort] === 'unknown') {
        aux = [...aux, e];
      }
      if (e[columnSort] !== 'unknown') {
        newArr = [...newArr, e];
      }
    });
    console.log(aux, newArr);
    if (columnSortRadio === 'ASC') {
      const arr = newArr.sort((a, b) => (a[columnSort] - b[columnSort]));
      setApiResults([...arr, ...aux]);
      setMultfilters([]);
    }
    if (columnSortRadio === 'DESC') {
      const arr = newArr.sort((a, b) => (b[columnSort] - a[columnSort]));
      setApiResults([...arr, ...aux]);
      setMultfilters([]);
    }
  };

  const handleAddFilter = (arrApiFilter) => {
    setApiFilter(arrApiFilter);
    setMultfilters((prev) => [...prev,
      { columnSelect, comparasionSelect, valueInput }]);
  };

  const handleClickDeleteFilter = (column) => {
    setApiFilter(apiResults);
    setColumnOptions((prev) => [...prev, column]);
    const newMultfilters = multfilters
      .filter((element) => element.columnSelect !== column);
    setMultfilters(newMultfilters);
  };

  useEffect(() => {
  //   const handleApiFilter = (arrApiFilter) => {
    if (multfilters.length === 0) {
      setApiFilter([]);
    } else {
      multfilters?.forEach((e) => {
        let elementColumn = '';
        const test = apiFilter?.filter((element) => {
          elementColumn = e.columnSelect;
          switch (e.comparasionSelect) {
          case 'maior que':
            return Number(element[e.columnSelect]) > Number(e.valueInput);
          case 'menor que':
            return Number(element[e.columnSelect]) < Number(e.valueInput);
          default:
            return Number(element[e.columnSelect]) === Number(e.valueInput);
          }
        });
        const newOptions = columnOptions.filter((element) => element !== elementColumn);
        setColumnOptions(newOptions);
        setColumnSelect(newOptions[0]);
        setApiFilter(test);
      });
    }
  }, [multfilters]);

  const filterCallback = useCallback(handleAddFilter, [columnSelect,
    comparasionSelect, valueInput]);

  const handleRemoveFilters = () => {
    setMultfilters([]);
    setColumnOptions(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
    setColumnSelect('population');
    setApiFilter([]);
  };

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();
        setApiResults(results.map((e) => {
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
    handleClickDeleteFilter,
    handleRemoveFilters,
    handleSort,
    handleColumnSortRadio,
    handleColumnSort,
  }), [apiResults, nameFiltered, columnSelect,
    comparasionSelect, valueInput, apiFilter,
    multfilters, columnOptions, filterCallback,
    handleClickDeleteFilter, handleRemoveFilters,
    handleSort,
  ]);
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
