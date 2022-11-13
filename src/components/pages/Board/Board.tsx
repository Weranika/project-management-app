import React, { useEffect, useState } from 'react';
import './Board.scss';
import axiosConfig from '../../../util/axiosConfig';
import ModalCreateColumn from '../../ModalCreateColumn/ModalCreateColumn';
import { Column, columnState } from '../../../types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hook';
//import Button from '@mui/material/Button';
// import {
//   searchCards,
//   setError,
//   setSorting,
//   setCurrentPage,
//   setCardsPerPage,
//   setAllPages,
// } from '../../cardsSlice';
import { getColumns } from '../../../columnsSlice';

function Board() {
  // const [columns, setColumns] = useState([]);
  const dispatch = useAppDispatch();
  const { columnsArr } = useSelector((state: { columns: columnState }) => state.columns);

  useEffect(() => {
    const url = `/boards/636fcdd30cb48a0c4248c4b4/columns`;
    dispatch(getColumns(url));
  }, []);

  const createColumn = async () => {
    console.log('create column');
    const url = `/boards/636fcdd30cb48a0c4248c4b4/columns`;
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NjgzNjExMjYsImV4cCI6MTY2ODQwNDMyNn0.1k6wJZUwH2KE_RGH3o8QXbmdzfREuwPSdjYIasH6X7o';
    try {
      const apiData = await axiosConfig.post(
        url,
        {
          title: 'my-column2',
          order: 2,
        },
        {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(apiData);
      dispatch(getColumns(url));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="board">
      <section className="board__page">
        <h1 className="board__title">Board page</h1>
        <section className="board__columns">
          {columnsArr.map((column: Column, index: number) => {
            return (
              <div className="column" key={index}>
                <div className="column__header">
                  <h3 className="column__title">{column.title}</h3>
                </div>
                <button>Add task</button>
              </div>
            );
          })}
          {/*  <Button variant="contained">Contained</Button> */}
          <button onClick={createColumn} className="button button--create-column">
            + Add column
          </button>
        </section>
        <ModalCreateColumn />
      </section>
    </main>
  );
}

export default Board;
