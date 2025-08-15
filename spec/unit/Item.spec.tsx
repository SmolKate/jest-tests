import { render, screen } from '@testing-library/react';
import ue from "@testing-library/user-event";
import { Item } from 'src/components/Item';

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('Элемент списка задач', () => {
    it('название не должно быть больше 32 символов', () => {
        const itemLong = {
            id: "1",
            header: "купить хлеб, много хлеба, очень !",
            done: false,
        }

        const itemShort = {
            id: "1",
            header: "купить хлеб!",
            done: false,
        }

        const onDelete = jest.fn();
        const onToggle = jest.fn();

        const { rerender } = render(<Item {...itemLong} onDelete={onDelete} onToggle={onToggle} />);
        const htmlElement1 = screen.queryByText(itemLong.header);
        expect(htmlElement1).not.toBeInTheDocument()

        rerender(<Item {...itemShort} onDelete={onDelete} onToggle={onToggle} />);
        const htmlElement2 = screen.queryByText(itemShort.header);
        expect(htmlElement2).toBeInTheDocument()
    });

    it('название не должно быть пустым', () => {
        const item = {
            id: "1",
            header: "",
            done: false,
        }

        const onDelete = jest.fn();
        const onToggle = jest.fn();

        render(<Item {...item} onDelete={onDelete} onToggle={onToggle} />);
        const htmlElement1 = screen.queryByRole('listitem');
        expect(htmlElement1).not.toBeInTheDocument()
    });

    it('нельзя удалять невыполненные задачи', async () => {
        const item = {
            id: "1",
            header: "Купить хлеб",
            done: false,
        }

        const onDelete = jest.fn();
        const onToggle = jest.fn();
        render(<Item {...item} onDelete={onDelete} onToggle={onToggle} />);

        const elem = screen.getByRole('button');
        await userEvent.click(elem)

        expect(onDelete).not.toBeCalled();
    });

    it('при клике на lable изменяется чекбокс', async () => {
        const item = {
            id: "1",
            header: "Купить хлеб",
            done: false,
        }

        const onDelete = jest.fn();
        const onToggle = jest.fn();
        render(<Item {...item} onDelete={onDelete} onToggle={onToggle} />);

        const labelElement = screen.getByText(item.header);
        const checkboxElement = screen.getByRole('checkbox');

        await userEvent.click(labelElement)

        expect(checkboxElement).toBeChecked()
    });

    it('ображение элемента списка', () => {
        const item = {
            id: "1",
            header: "Купить хлеб",
            done: false,
        }

        const onDelete = jest.fn();
        const onToggle = jest.fn();

        const { rerender, asFragment } = render(
            <Item {...item} onDelete={onDelete} onToggle={onToggle} />
        );
        const firstRender = asFragment();
        
        rerender(<Item {...item} onDelete={onDelete} onToggle={onToggle} />);
        const secondRender = asFragment();
        
        expect(firstRender).toMatchDiffSnapshot(secondRender);
    });
});