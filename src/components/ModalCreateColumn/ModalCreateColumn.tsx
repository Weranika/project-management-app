import React from 'react';

export default function ModalCreateColumn() {
  return (
    <div>
      <form>
        <label>Title</label>
        <input type="text" name="column__title" id="column__title" />
        <button>Create</button>
        <button>Cancel</button>
        <button>&:time</button>
      </form>
    </div>
  );
}
