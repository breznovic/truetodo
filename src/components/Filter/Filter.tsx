import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import s from "./Filter.module.css";
import { changeFilter } from "../../slices/todolistsSlice";
import { FilterType } from "../../utils/types/types";
import { useEffect, useState } from "react";

export const Filter = () => {
  const filterValue = useSelector(
    (state: RootState) => state.todolists.todolists.filter
  );

  let tasks = useSelector((state: RootState) => state.tasks.tasks);

  const dispatch = useDispatch();

  const [filteredTask, setFilteredTask] = useState(tasks);

  const onChangeFilter = (filterValue: FilterType, todolistId: string) => {
    dispatch(changeFilter({filterValue, todolistId}));
  };

  useEffect(() => {
    if (filterValue === "all") {
      setFilteredTask(tasks);
    }
    if (filterValue === "active") {
      setFilteredTask(tasks.filter((t) => t.isDone === false));
    }
    if (filterValue === "completed") {
      setFilteredTask(tasks.filter((t) => t.isDone === true));
    }
  }, [filterValue, tasks]);

  return (
    <div className={s.filter}>
      <ul>
        <button
          onClick={() => onChangeFilter(filterValue)}
          className={filterValue === "all" ? s.active : ""}
        >
          All
        </button>
        <button
          onClick={() => onChangeFilter(filterValue)}
          className={filterValue === "active" ? s.active : ""}
        >
          Active
        </button>
        <button
          onClick={() => onChangeFilter(filterValue)}
          className={filterValue === "completed" ? s.active : ""}
        >
          Completed
        </button>
      </ul>
    </div>
  );
};
