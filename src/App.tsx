import { useState } from 'react';
import classes from './App.module.css';

type FetchedItem = {
  id: string;
  text: string;
};

const mockItems = [
  { id: 'itemA', text: "Item A" },
  { id: 'itemB', text: "item B" },
  { id: 'itemC', text: "item C" },
  { id: 'itemD', text: "item D" }
];

function App() {
  const [fetchedItems, setFetchedItems] = useState<FetchedItem[]>(mockItems);
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
    setFetchedItems(fetchedItems.filter(item => item.text !== droppedEl));
  };

  const onReturnItemHandler = (e: React.DragEvent) => {
    const droppedEl = e.dataTransfer.getData("text");

    setAddedItems(addedItems.filter(addedItem => addedItem !== droppedEl));
    setFetchedItems(prevItems => ([...prevItems, { id: droppedEl, text: droppedEl }]));
  };

  return (<main className={classes['app-container']}>
    <ul className={classes.draggable} onDrop={onReturnItemHandler} onDragOver={onDragOverHandler}>
      {fetchedItems.map((item) => (
        <li 
          key={item.id}
          className={classes.item}
          onDragStart={dragStartHandler}
          draggable
        >
          {item.text}
        </li>
      ))}
    </ul>

    <ul 
      className={classes.droppable} 
      onDrop={onDropHandler}
      onDragOver={onDragOverHandler}
    >
      {addedItems.map((item, index) => (
        <li 
          key={`${item}-${index}`} 
          className={classes.item} 
          onDragStart={dragStartHandler}
          draggable
        >
          {item}
        </li>
      ))}
    </ul>
  </main>);
}

export default App;
