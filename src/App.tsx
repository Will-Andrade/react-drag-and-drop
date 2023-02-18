import { useState } from 'react';
import classes from './App.module.css';

function App() {
  const [addedItems, setAddedItems] = useState<string[]>();

  const dragStartHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData("text/plain", String(e.currentTarget.textContent));
    console.log(e.dataTransfer.getData("text"));
  };

  const onDragOverHandler = (e: React.DragEvent) => {};
  const onDropHandler = (e: React.DragEvent) => {}

  return (<main className={classes['app-container']}>
    <ul className={classes.draggable}>
      <li className={classes.item} onDragStart={dragStartHandler}draggable>Item A</li>
      <li className={classes.item} onDragStart={dragStartHandler}draggable>Item B</li>
      <li className={classes.item} onDragStart={dragStartHandler}draggable>Item C</li>
      <li className={classes.item} onDragStart={dragStartHandler}draggable>Item D</li>
    </ul>

    <ul className={classes.droppable} onDragOver={onDragOverHandler} onDrop={onDropHandler}>
      {addedItems}
    </ul>
  </main>);
}

export default App;
