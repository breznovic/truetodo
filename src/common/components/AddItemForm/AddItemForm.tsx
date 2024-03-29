import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
  label: string;
};

export const AddItemForm = React.memo(function ({
  addItem,
  disabled = false,
  label,
}: AddItemFormPropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label={label}
        helperText={error}
      />
      <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
        <AddToPhotosIcon />
      </IconButton>
    </div>
  );
});
