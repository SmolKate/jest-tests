import { cleanup, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { NewTaskBar } from "src/modules/NewTaskBar";
import { TaskList } from "src/modules/TaskList";
import { renderWithProviders } from "../utils/renderWithProviders";
import { items10done1 } from "../__mocks__/listItems";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('Список задач', () => {
  beforeEach(async () => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup()
  })

  // нельзя перевести задачу в невыполненную, если их уже 10
  it('Список содержит не больше 10 невыполненных задач', async () => {
    const preloadedState = {
      taskList: {
        list: items10done1,
        notification:""
      }
    }
    renderWithProviders(<TaskList />, {preloadedState})

    const checkedItem = screen.getByRole('checkbox', { checked: true });
    await userEvent.click(checkedItem);

    expect(checkedItem).toBeChecked()
  });
});