import React, { useMemo, useState } from "react";
import useTodosContext from "../services/hooks/useTodosContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";

const Todos: React.FC = () => {
  const { todos } = useTodosContext();
  const [search, setSearch] = useState("");

  const searchedTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, todos]);

  return (
    <Box my={5}>
      <Box
        display={"flex"}
        alignItems={"center"}
        my={5}
        m={"0 auto"}
        width={{
          xs: "100%",
          sm: "50%",
          md: "25%",
          lg: "25%",
          xl: "25%",
        }}
      >
        <Typography color={"#fff"} variant={"body1"}>
          Filter
        </Typography>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: 1,
            paddingX: 2,
            paddingY: 1,
          }}
          placeholder="Search"
          onChange={({ target: { value } }) => setSearch(value)}
        />
      </Box>
      <Box>
        {searchedTodos.map((todo) => (
          <Card
            key={todo.id}
            sx={{
              width: {
                xs: "100%",
                sm: "50%",
                md: "25%",
                lg: "25%",
                xl: "25%",
              },
              paddingX: 5,
              paddingY: 5,
              backgroundColor: "#fff",
            }}
          >
            {todo.title}
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Todos;
