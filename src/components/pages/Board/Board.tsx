import axiosConfig from '../../../util/axiosConfig';
import React, { useEffect, useState } from 'react';
import './Board.scss';
//import Button from '@mui/material/Button';

interface column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

function Board() {
  const [columns, setColumns] = useState([]);
  const showColumns = async () => {
    const url = `/boards/636fcdd30cb48a0c4248c4b4/columns`;
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NjgyNzE0NDcsImV4cCI6MTY2ODMxNDY0N30.qBTcsCN4XIxqntImcPYJ1eVtMZ9zZXygg4gtU3dUKRM';
    try {
      const apiData = await axiosConfig.get(url, {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      });
      console.log(apiData);
      setColumns(apiData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showColumns();
  }, []);

  const createColumn = async () => {
    console.log('create column');
    const url = `/boards/636fcdd30cb48a0c4248c4b4/columns`;
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjk1NDQyMWQ3N2E4YjZlNmM0ZDhlOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NjgyNzE0NDcsImV4cCI6MTY2ODMxNDY0N30.qBTcsCN4XIxqntImcPYJ1eVtMZ9zZXygg4gtU3dUKRM';
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
      showColumns();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="board">
      <section className="board__page">
        <h1 className="board__title">Board page</h1>
        <section className="board__columns">
          {columns.map((column: column, index: number) => {
            return (
              <div className="column" key={index}>
                <div className="column__header">
                  <h3 className="column__title">{column.title}</h3>
                </div>
              </div>
            );
          })}
          {/*  <Button variant="contained">Contained</Button> */}
          <button onClick={createColumn} className="button button--create-column">
            + Add column
          </button>
        </section>
      </section>
    </main>
  );
}

export default Board;
