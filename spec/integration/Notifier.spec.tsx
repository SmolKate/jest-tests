import { cleanup, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { NewTaskBar } from "src/modules/NewTaskBar";
import { TaskList } from "src/modules/TaskList";
import { NotifierContainer } from "src/modules/NotifierContainer";
import { renderWithProviders } from "../utils/renderWithProviders";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('Оповещение при вополнении задачи', () => {
    beforeEach(async () => {
        localStorage.clear();
        jest.clearAllMocks();
    });
    
    afterEach(() => {
        cleanup()
    })
    
    it('появляется и содержит заголовок задачи', async () => {
        renderWithProviders(
            <>
                <NewTaskBar />
                <TaskList />
                <NotifierContainer />
            </>
        );
        
        const inputEl = screen.getByRole('textbox');
        const addBtnEl = screen.getByAltText(/Добавить/i);
    
        await userEvent.clear(inputEl);
        await userEvent.type(inputEl, 'Первый заголовок');
        await userEvent.click(addBtnEl);
        const firstListItem = screen.getByLabelText('Первый заголовок')
        await userEvent.click(firstListItem);

        const notifierEl = screen.getByTestId("notifier");
        
        expect(notifierEl.innerHTML).toContain('Первый заголовок');
    });
    it('одновременно может отображаться только одно', async () => {
        renderWithProviders(
            <>
                <NewTaskBar />
                <TaskList />
                <NotifierContainer />
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
        const secondListItem = screen.getByLabelText('Второй заголовок')
        await userEvent.click(firstListItem);
        await userEvent.click(secondListItem);

        const notifierElList = screen.getAllByTestId("notifier");
        
        expect(notifierElList).toHaveLength(1);
    });
});