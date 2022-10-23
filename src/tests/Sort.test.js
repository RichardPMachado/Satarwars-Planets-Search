import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from "../../cypress/mocks/testData";
import renderWithContext from "./renderWithContext";
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';

it('Verifica funcionalidade dos filtros ASC e DESC', async () => {
  global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(testData),
  })
);

await act(async () => {
  renderWithContext(<App />);
})

  const ascRadio = screen.getByTestId("column-sort-input-asc");
  const population = screen.getByTestId("column-sort");
  const btnFilterSort = screen.getByRole('button', {  name: /ordenar/i});
  
  userEvent.selectOptions(population, ["population"]);
  userEvent.click(ascRadio);
  userEvent.click(btnFilterSort);
  
  const planetsAsc = await screen.findAllByTestId('planet-name');
  expect(planetsAsc[0].innerHTML).toBe('Yavin IV');
  console.log('ugigi', planetsAsc)
  
  const descRadio = screen.getByTestId("column-sort-input-desc");
  userEvent.selectOptions(population, ["population"]);
  userEvent.click(descRadio);
  userEvent.click(btnFilterSort);
  
  const planetsDesc = await screen.findAllByTestId('planet-name');
  expect(planetsDesc[0].innerHTML).toBe('Coruscant');

});