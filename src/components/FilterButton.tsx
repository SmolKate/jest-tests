type Props = {
  onClick: () => void;
};

export const FilterButton = ({ onClick }: Props) => {
  return (
    <button
      className="button"
      onClick={onClick}
      data-alt="фильтрация задач"
    >
      Отфильтровать
    </button>
  );
};
