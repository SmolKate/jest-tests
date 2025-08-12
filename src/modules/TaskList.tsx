import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { FilterButton } from "src/components/FilterButton";
import { List } from "src/components/List";
import { deleteTask, tasksSelector, toggleTask } from "src/store/taskSlice";

export const TaskList = () => {
  const items = useSelector(tasksSelector);
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState(false)

  let filteredItems = items

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  const handleFilterClick = () => {
    setIsFilter(prevState => !prevState)
  }

  if (isFilter) {
    filteredItems = items.filter(item => !item.done)
  }

  return items.length > 0 ? (
    <>
      <FilterButton onClick={handleFilterClick}/>
      <List items={filteredItems} onDelete={handleDelete} onToggle={handleToggle} />
    </>
  ) : (
    <Empty />
  );
};
