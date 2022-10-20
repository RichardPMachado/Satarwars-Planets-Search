import { useContext } from 'react';
import AppContext from '../Context/appContext';

export default function MultFilter() {
  const { multfilters } = useContext(AppContext);
  return (
    <div>
      <ul>
        {multfilters.length > 0
        && multfilters.map(({
          columnSelect, comparasionSelect, valueInput,
        }) => (
          <li key={ `${columnSelect}-${valueInput}` }>
            {`${columnSelect} ${comparasionSelect} ${valueInput} `}
            <button type="button">Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
