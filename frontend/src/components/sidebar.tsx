import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useTodosContext from "../services/hooks/useTodosContext";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import SearchSvg from "../assets/search.svg";
import AddSvg from "../assets/add.svg";
import MoonSvg from "../assets/moon.svg";
import CloseSvg from "../assets/close.svg";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import TodoForm from "./todoForm";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Content from "./content";

const Sidebar: React.FC = () => {
  const { todos, currentTodo, setCurrentTodo } = useTodosContext();
  const [collapse, setCollapse] = useState(false);
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

  const handleClose = useCallback(() => {
    setDialog(false);
  }, []);

  useEffect(() => {
    if (!isMobile && showContent) setShowContent(false);
  }, [isMobile, showContent]);

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
      >
        <IconButton onClick={() => setCollapse(!collapse)}>
          {!collapse ? (
            <img src={SearchSvg} width={18} height={18} />
          ) : (
            <img src={CloseSvg} width={18} height={18} />
          )}
        </IconButton>
        <IconButton onClick={() => setDialog(true)}>
          <img src={AddSvg} width={18} height={18} />
        </IconButton>
        {/* <IconButton>
          <img src={SortSvg} width={18} height={18} />
        </IconButton> */}
        <IconButton>
          <img src={MoonSvg} width={18} height={18} />
        </IconButton>
      </Stack>
      <Collapse
        in={collapse}
        timeout="auto"
        unmountOnExit
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingX: 2,
        }}
      >
        <Input
          onChange={({ target: { value } }) => setSearch(value)}
          onBlur={() => setCollapse(false)}
          sx={{
            marginBottom: 3,
            width: "100%",
          }}
          startAdornment={
            <InputAdornment position="start">
              <img src={SearchSvg} width={18} height={18} />
            </InputAdornment>
          }
        />
      </Collapse>
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
                zIndex: 999999,
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
            {searchedTodos
              ?.filter((todo) => todo.completed === false)
              ?.map((todo) => (
                <ListItemButton
                  sx={{
                    backgroundColor:
                      currentTodo?.id === todo.id ? "#000" : "transparent",
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
                      color: currentTodo?.id === todo.id ? "#fff" : "#9D9A9B",
                    }}
                  />
                </ListItemButton>
              ))}
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
            {searchedTodos
              ?.filter((todo) => todo.completed)
              ?.map((todo) => (
                <ListItemButton
                  sx={{
                    backgroundColor:
                      currentTodo?.id === todo.id ? "#000" : "transparent",
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
                      color: currentTodo?.id === todo.id ? "#fff" : "#9D9A9B",
                    }}
                  />
                </ListItemButton>
              ))}
          </Box>
        )}
      </Box>
      <TodoForm open={dialog} onClose={handleClose} />
    </Box>
  );
};

export default Sidebar;
