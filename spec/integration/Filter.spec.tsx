import { cleanup, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { NewTaskBar } from "src/modules/NewTaskBar";
import { TaskList } from "src/modules/TaskList";
import { renderWithProviders } from "../utils/renderWithProviders";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('Фильтрация задач', () => {
  beforeEach(async () => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup()
  })

  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it('с включенным фильтром', async () => {
    renderWithProviders(
      <>
        <NewTaskBar />
        <TaskList />
      </>
    );
          
    const inputEl = screen.getByRole('textbox');
    const addBtnEl = screen.getByAltText(/Добавить/i);

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, 'Первый заголовок');
    await userEvent.click(addBtnEl);

    await userEvent.type(inputEl, 'Второй заголовок');
    await userEvent.click(addBtnEl);

    const firstListItem = screen.getByLabelText('Первый заголовок')
    await userEvent.click(firstListItem);

    const filteBtnEl = screen.getByText(/Отфильтровать/i);
    await userEvent.click(filteBtnEl);
    const checkboxItems: HTMLInputElement[] = screen.queryAllByRole('checkbox');

    expect(checkboxItems.filter(item => item.checked)).toHaveLength(0);
  });
    
  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it('с выключенным фильтром', async () => {
    renderWithProviders(
      <>
        <NewTaskBar />
        <TaskList />
      </>
    );
          
    const inputEl = screen.getByRole('textbox');
    const addBtnEl = screen.getByAltText(/Добавить/i);

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, 'Первый заголовок');
    await userEvent.click(addBtnEl);

    await userEvent.type(inputEl, 'Второй заголовок');
    await userEvent.click(addBtnEl);

    const firstListItem = screen.getByLabelText('Первый заголовок')
    await userEvent.click(firstListItem);

    const filteBtnEl = screen.getByText('Отфильтровать');
    await userEvent.dblClick(filteBtnEl);
    const checkboxItems: HTMLInputElement[] = screen.queryAllByRole('checkbox');

    expect(checkboxItems.filter(item => item.checked)).toHaveLength(1);
  });

  // не показывает кнопку при пустом списке задач
  it('нет кнопки фильтрации', async () => {
    const preloadedState = {
      taskList: {
        list: [],
        notification:""
      }
    }
    renderWithProviders(<TaskList />, {preloadedState})

    const filteBtnEl = screen.queryByText('Отфильтровать');
    expect(filteBtnEl).not.toBeInTheDocument();
  });

});