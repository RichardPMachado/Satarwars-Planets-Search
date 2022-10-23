import { useContext } from 'react';
import AppContext from '../Context/AppContext';

function MultFilter() {
  const { multfilters, handleClickDeleteFilter } = useContext(AppContext);
  return (
    <div>
      <ul>
        {multfilters.length > 0
        && multfilters?.map(({
          columnSelect, comparasionSelect, valueInput,
        }) => (
          <li data-testid="filter" key={ `${columnSelect}-${valueInput}` }>
            {`${columnSelect} ${comparasionSelect} ${valueInput} `}
            <button
              id="btn-da-madruga"
              type="button"
              onClick={ () => handleClickDeleteFilter(columnSelect) }
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MultFilter;
