import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import useTodosContext from "../services/hooks/useTodosContext";
import { useEffect, useState } from "react";
import { Todo } from "../@types/types";

const TodoForm: React.FC<{
  id?: number;
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose, id }) => {
  const { createTodoMutation, updateTodoMutation, currentTodo } =
    useTodosContext();
  const [updateTodo, setUpdateTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (id) {
      setUpdateTodo(currentTodo);
    }
  }, [currentTodo, id]);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const { title, description } = formJson;
          if (id) {
            updateTodoMutation({ id, title, description });
            onClose();
            return;
          }
          createTodoMutation({ title, description });
          onClose();
        },
      }}
    >
      <DialogTitle>{id ? "Update Todo" : "Create Todo"}</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="standard"
            name="title"
            defaultValue={updateTodo?.title ?? ""}
          />
          <TextField
            fullWidth
            multiline
            id="outlined-basic"
            label="Description"
            variant="standard"
            name="description"
            defaultValue={updateTodo?.description ?? ""}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button type="submit">{id ? "Update Todo" : "Save changes"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoForm;
