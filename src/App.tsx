import { useState } from 'react';
import classes from './App.module.css';

function App() {
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const dragStartHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData("text/plain", String(e.currentTarget.textContent));
  };

  const onDragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDropHandler = (e: React.DragEvent) => {
    const droppedEl = e.dataTransfer.getData("text");
    setAddedItems([...addedItems, droppedEl]);
  }

  return (<main className={classes['app-container']}>
    <ul className={classes.draggable}>
      <li className={classes.item} onDragStart={dragStartHandler} draggable>Item A</li>
      <li className={classes.item} onDragStart={dragStartHandler} draggable>Item B</li>
      <li className={classes.item} onDragStart={dragStartHandler} draggable>Item C</li>
      <li className={classes.item} onDragStart={dragStartHandler} draggable>Item D</li>
    </ul>

    <ul 
      className={classes.droppable} 
      onDrop={onDropHandler}
      onDragOver={onDragOverHandler}
    >
      {addedItems.map((item, index) => (
        <li key={`${item}-${index}`} className={classes.item} draggable>{item}</li>
      ))}
    </ul>
  </main>);
}

export default App;
