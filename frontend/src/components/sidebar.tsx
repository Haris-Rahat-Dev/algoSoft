import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useTodosContext from "../services/hooks/useTodosContext";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import SearchSvg from "../assets/search.svg";
import AddSvg from "../assets/add.svg";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import TodoForm from "./todoForm";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Content from "./content";
import Tooltip from "@mui/material/Tooltip";

const Sidebar: React.FC = () => {
  const { todos, currentTodo, setCurrentTodo } = useTodosContext();
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const searchedTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, todos]);

  const pendingTodos = useMemo(() => {
    return searchedTodos?.filter((todo) => todo.completed === false);
  }, [searchedTodos]);

  const completedTodos = useMemo(() => {
    return searchedTodos?.filter((todo) => todo.completed === true);
  }, [searchedTodos]);

  const handleClose = useCallback(() => {
    setDialog(false);
  }, []);

  useEffect(() => {
    if (!isMobile && showContent) setShowContent(false);
    if (isMobile) setCurrentTodo(null);
  }, [isMobile, setCurrentTodo, showContent]);

  return (
    <Box
      height={"100%"}
      sx={{
        width: {
          xs: "100%",
          sm: "40%",
          md: "30%",
          lg: "25%",
          xl: "20%",
        },
        backgroundColor: "#2b2426",
        display: "flex",
        flexDirection: {
          xs: "column-reverse",
          sm: "column",
          md: "column",
          lg: "column",
        },
      }}
    >
      <Stack
        direction="row"
        paddingY={2}
        paddingX={2}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={5}
      >
        <Input
          onChange={({ target: { value } }) => setSearch(value)}
          placeholder="Search"
          sx={{
            width: "100%",
          }}
          startAdornment={
            <InputAdornment position="start">
              <img src={SearchSvg} width={24} height={24} />
            </InputAdornment>
          }
        />
        <Tooltip title={"Add"}>
          <IconButton onClick={() => setDialog(true)}>
            <img src={AddSvg} width={24} height={24} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflowY: "scroll",
        }}
      >
        {showContent ? (
          <Content close={() => setShowContent(false)} />
        ) : (
          <Box width={"100%"}>
            <Box
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#2b2426",
                zIndex: 99,
                paddingY: 1,
                paddingX: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#9D9A9B",
                  fontSize: 25,
                  fontWeight: 700,
                }}
              >
                Todos
              </Typography>
            </Box>
            {searchedTodos.length > 0 ? (
              <Box>
                <Typography
                  marginBottom={2}
                  sx={{
                    color: "#9D9A9B",
                    fontSize: 15,
                    paddingX: 2,
                  }}
                >
                  Pending Todos
                </Typography>
                {pendingTodos.length > 0 ? (
                  pendingTodos?.map((todo) => (
                    <ListItemButton
                      sx={{
                        backgroundColor:
                          currentTodo?.id === todo.id
                            ? "#ee5b84"
                            : "transparent",
                        marginX: 2,
                      }}
                      onClick={() => {
                        setCurrentTodo(todo);
                        if (isMobile) setShowContent(true);
                      }}
                      key={todo.id}
                    >
                      <ListItemText
                        primary={todo.title}
                        sx={{
                          color:
                            currentTodo?.id === todo.id ? "#fff" : "#9D9A9B",
                        }}
                      />
                    </ListItemButton>
                  ))
                ) : (
                  <Typography color={"#9D9A9B"} paddingX={2}>
                    No Pending Todos
                  </Typography>
                )}
                <Typography
                  marginBottom={2}
                  sx={{
                    marginTop: 3,
                    color: "#9D9A9B",
                    fontSize: 15,
                    paddingX: 2,
                  }}
                >
                  Completed Todos
                </Typography>
                {completedTodos.length > 0 ? (
                  completedTodos?.map((todo) => (
                    <ListItemButton
                      sx={{
                        backgroundColor:
                          currentTodo?.id === todo.id
                            ? "#ee5b84"
                            : "transparent",
                        marginX: 2,
                      }}
                      onClick={() => {
                        setCurrentTodo(todo);
                        if (isMobile) setShowContent(true);
                      }}
                      key={todo.id}
                    >
                      <ListItemText
                        primary={todo.title}
                        sx={{
                          color:
                            currentTodo?.id === todo.id ? "#fff" : "#9D9A9B",
                        }}
                      />
                    </ListItemButton>
                  ))
                ) : (
                  <Typography color={"#9D9A9B"} paddingX={2}>
                    No Completed Todos
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography color={"#9D9A9B"} paddingX={2}>
                Add Todos to see them here
              </Typography>
            )}
          </Box>
        )}
      </Box>
      {dialog && <TodoForm open={dialog} onClose={handleClose} />}
    </Box>
  );
};

export default Sidebar;
