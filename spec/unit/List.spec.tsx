import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { List } from "src/components/List";
import { items10done1 } from "../__mocks__/listItems";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

it("отображение списка задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items: Task[] = [
    {
      id: "1",
      header: "купить хлеб",
      done: false,
    },
    {
      id: "2",
      header: "купить молоко",
      done: false,
    },
    {
      id: "3",
      header: "выгулять собаку",
      done: true,
    },
  ];

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );
  const firstRender = asFragment();
  
  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("Список содержит не больше 10 невыполненных задач", async () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  render(
    <List items={items10done1} onDelete={onDelete} onToggle={onToggle} />
  );

  const checkedItem = screen.getByRole('checkbox', { checked: true });
  await userEvent.click(checkedItem);

  expect(checkedItem).toBeChecked()
});
