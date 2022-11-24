import React from 'react';

import { BoardType } from '../../types';

import './BoardItem.scss';

export default function BoardItem({ board }: { board: BoardType }) {
  return <div className="boardItem">{board.title}</div>;
}
