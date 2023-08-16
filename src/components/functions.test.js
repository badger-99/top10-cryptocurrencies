/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { generateNavLinks, searchByRank } from './functions';

describe('testing helper functions', () => {
  test('test generateNavLinks function', () => {
    const cryptoArray = [
      {
        name: 'testCoin',
        rank: '1',
      },
      {
        name: 'subCoin',
        rank: '2',
      },
    ];

    const container = render(
      <MemoryRouter>
        <ul>{generateNavLinks(cryptoArray)}</ul>
      </MemoryRouter>
    );

    const li1 = screen.getByText('#1 testCoin')
    const li2 = screen.getByText('#2 subCoin')

    expect(li1).toBeInTheDocument();
    expect(li2).toBeInTheDocument();
  });

  test('test searchByRank function with exsisting rank', () => {
    const cryptoArray = [
      {
        name: 'testCoin',
        rank: '1',
      },
      {
        name: 'subCoin',
        rank: '2',
      },
      {
        name: 'miniCoin',
        rank: '3',
      },
    ];

    const {getByText, getByRole, queryByText} = render(
      <MemoryRouter>
        <div>{searchByRank(cryptoArray, '3')}</div>
      </MemoryRouter>
    )

    const link = getByRole('link');

    expect(queryByText('#1 testCoin')).not.toBeInTheDocument();
    expect(queryByText('#2 subCoin')).not.toBeInTheDocument();
    expect(getByText('#3 miniCoin')).toBeInTheDocument();
    expect(queryByText('Out Of Bounds.')).not.toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/3');
  })

  test('test searchByRank function with non-exsisting rank', () => {
    const cryptoArray = [
      {
        name: 'testCoin',
        rank: '1',
      },
      {
        name: 'subCoin',
        rank: '2',
      },
      {
        name: 'miniCoin',
        rank: '3',
      },
    ];

    const {getByText, queryByText} = render(
      <MemoryRouter>
        <div>{searchByRank(cryptoArray, 'anyOtherValue')}</div>
      </MemoryRouter>
    )

    expect(queryByText('#1 testCoin')).not.toBeInTheDocument();
    expect(queryByText('#2 subCoin')).not.toBeInTheDocument();
    expect(queryByText('#3 miniCoin')).not.toBeInTheDocument();
    expect(getByText('Out Of Bounds.')).toBeInTheDocument();
  })
});
