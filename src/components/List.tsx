import { Item } from "./Item";

type Props = {
  items: Task[];
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const List = ({ items, onDelete, onToggle }: Props) => {
  const activeItems = items.filter(item => !item.done).length

  const onToggleHandler = (id: Task["id"], event?: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const clickedItem = items.find(item => item.id === id)

    if (activeItems === 10 && clickedItem?.done) {
      event?.preventDefault()
    } else {
      onToggle(id)
    }
  }

  return (
  <ul className="task-list tasks">
    {items.map((item) => (
      <Item
        {...item}
        key={item.id}
        onDelete={onDelete}
        onToggle={onToggleHandler}
      />
    ))}
  </ul>
)};
