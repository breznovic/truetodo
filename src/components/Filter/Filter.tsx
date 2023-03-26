import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../slices/filterSlice";
import { RootState } from "../../store/store";
import s from "./Filter.module.css";

const filter = ["All", "Active", "Completed"];

export const Filter = () => {
  const filterValue = useSelector(
    (state: RootState) => state.filter.filterValue
  );

  const dispatch = useDispatch();

  const onChangeFilter = (index: number) => {
    dispatch(setFilter(index));
  };

  return (
    <div className={s.filter}>
      <ul>
        {filter.map((c, index) => (
          <button
            key={index}
            onClick={() => onChangeFilter(index)}
            className={filterValue === index ? s.active : ""}
          >
            {c}
          </button>
        ))}
      </ul>
    </div>
  );
};
