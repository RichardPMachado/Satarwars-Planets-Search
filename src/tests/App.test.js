import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from "../../cypress/mocks/testData";
import renderWithContext from "./renderWithContext";
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';

afterEach(() => jest.clearAllMocks());
describe('testes para a aplicação', () => {
  it("Verifica se certos filtros funcionam corretamente", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testData),
      })
    );
    await act(async () => {
      renderWithContext(<App />);
    })

    expect(fetch).toHaveBeenCalled();
    const nameInput = screen.getByTestId("name-filter");
    const columnSelect = screen.getByTestId("column-filter");
    const comparisonSelect = screen.getByTestId("comparison-filter");
    const numberInput = screen.getByTestId("value-filter");

    
    expect(nameInput).toBeInTheDocument();
    expect(columnSelect).toBeInTheDocument();
    expect(comparisonSelect).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
   
    const textB = await screen.findByRole('textbox');
    userEvent.type(textB, 'aa');
    expect(await screen.findByText(/Alderaan/i)).toBeInTheDocument();
    userEvent.clear(textB);
    
    const tableElement = await screen.findByRole("cell", { name: /tatooine/i });
    expect(tableElement).toBeInTheDocument();

    const filterBtn = screen.getByTestId("button-filter");
    expect(filterBtn).toBeInTheDocument();
    userEvent.selectOptions(columnSelect, ["population"]);
    userEvent.selectOptions(comparisonSelect, ["maior que"]);
    expect(comparisonSelect).toHaveValue("maior que")
    userEvent.type(numberInput, "200000");
    userEvent.click(filterBtn);

    waitFor(() => expect(screen.getAllByRole('row')).toHaveLegth(6))
    userEvent.clear(numberInput);
    const btnRemoveFilters = screen.getByTestId("button-remove-filters")
    userEvent.click(btnRemoveFilters);



    const newTableElement = await screen.findByRole("cell", { name: /bespin/i });
  
    expect(newTableElement).toBeInTheDocument();
    expect(tableElement).not.toBeInTheDocument();
  
    userEvent.selectOptions(comparisonSelect, ['menor que']);
    expect(comparisonSelect).toHaveValue('menor que')

    userEvent.selectOptions(columnSelect, ['diameter']);
    userEvent.type(numberInput, "12500");
    userEvent.click(filterBtn);
    waitFor(() => expect(screen.getAllByRole('row')).toHaveLegth(7))
    userEvent.clear(numberInput);
  
    userEvent.selectOptions(comparisonSelect, ['igual a']);
    userEvent.selectOptions(columnSelect, ['orbital_period']);
    userEvent.type(numberInput, "402");
    userEvent.click(filterBtn);
    waitFor(() => expect(screen.getAllByRole('row')).toHaveLegth(1))

    userEvent.clear(numberInput);
    const btnDelete =await screen.findAllByRole('button', {name: /excluir/i})
    console.log(btnDelete);
    userEvent.click(btnDelete[1])
    waitFor(() => expect(screen.getAllByRole('row')).toHaveLegth(7))
    userEvent.click(btnDelete[0])
    waitFor(() => expect(screen.getAllByRole('row')).toHaveLegth(10))

    const lastTableElement = await screen.findByRole('cell', {  name: /endor/i});
  
    expect(lastTableElement).toBeInTheDocument();
    expect(tableElement).not.toBeInTheDocument();
  });
})