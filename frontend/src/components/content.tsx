import Box from "@mui/material/Box";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import useTodosContext from "../services/hooks/useTodosContext";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import EditSvg from "../assets/edit.svg";
import DeleteSvg from "../assets/delete.svg";
import CheckSvg from "../assets/check.svg";
import CloseSvg from "../assets/close.svg";
import TodoForm from "./todoForm";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs from "dayjs";
import QuestionSvg from "../assets/questionMark.svg";
import { BASE_URL } from "../contants";

const Content: React.FC<{
  close?: Dispatch<SetStateAction<boolean>>;
}> = ({ close }) => {
  const {
    currentTodo,
    deleteTodoMutation,
    todos,
    setCurrentTodo,
    completeTodoMutation,
  } = useTodosContext();
  const [updateDialog, setUpdateDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = useCallback(() => {
    setUpdateDialog(false);
  }, []);

  useEffect(() => {
    const existingTodo = todos.find((todo) => todo.id === currentTodo?.id);
    if (!existingTodo) {
      setCurrentTodo(null);
    } else {
      setCurrentTodo(existingTodo);
    }
  }, [currentTodo?.id, setCurrentTodo, todos]);

  return (
    <Box
      flex={1}
      sx={{
        overflowY: "scroll",
        backgroundColor: "#202020",
        paddingX: 3,
        paddingY: 2,
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {isMobile && close && (
        <Box
          sx={{
            display: "flex",
            justifyContent: currentTodo ? "space-between" : "flex-end",
            marginBottom: 2,
          }}
        >
          <Box>
            {currentTodo && (
              <Stack
                flex={1}
                flexDirection={"row"}
                justifyContent={{
                  lg: "flex-end",
                  md: "flex-end",
                }}
                marginTop={{
                  xs: 2,
                  sm: 2,
                  lg: 0,
                  md: 0,
                }}
                gap={1}
              >
                <Stack flexDirection={"row"} alignItems={"center"}>
                  {!currentTodo?.completed ? (
                    <Stack flexDirection={"row"} alignItems={"center"}>
                      <Tooltip title="Complete">
                        <IconButton
                          onClick={() => {
                            completeTodoMutation(currentTodo.id);
                          }}
                        >
                          <img
                            style={{ fill: "#fff" }}
                            src={CheckSvg}
                            width={30}
                            height={30}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => setUpdateDialog(true)}>
                          <img
                            style={{ fill: "#fff" }}
                            src={EditSvg}
                            width={24}
                            height={24}
                          />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  ) : (
                    <Typography>Marked as Complete</Typography>
                  )}
                </Stack>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => {
                      deleteTodoMutation(currentTodo.id);
                    }}
                  >
                    <img src={DeleteSvg} width={24} height={24} />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
          </Box>
          <IconButton onClick={() => close(false)}>
            <img src={CloseSvg} width={24} height={24} />
          </IconButton>
        </Box>
      )}
      {currentTodo ? (
        <Fragment>
          <Stack flexDirection={"column"} alignItems={"stretch"} width={"100%"}>
            <Stack
              flexDirection={{
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              }}
              alignItems={{
                lg: "center",
                md: "center",
              }}
              gap={{
                sm: 2,
                xs: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: 5,
                }}
              >
                <Typography>
                  Created on:{" "}
                  {dayjs(currentTodo.createdAt).format("D MMMM YYYY")}
                </Typography>
                <Typography>
                  Last edited:{" "}
                  {dayjs(currentTodo.updatedAt).format("D MMMM YYYY")}
                </Typography>
              </Box>
              {!isMobile && (
                <Box>
                  {currentTodo.completed ? (
                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                      <Typography>Marked as Complete</Typography>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => {
                            deleteTodoMutation(currentTodo.id);
                          }}
                        >
                          <img src={DeleteSvg} width={24} height={24} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  ) : (
                    <Stack
                      flex={1}
                      flexDirection={"row"}
                      justifyContent={{
                        lg: "flex-end",
                        md: "flex-end",
                      }}
                      marginTop={{
                        xs: 2,
                        sm: 2,
                        lg: 0,
                        md: 0,
                      }}
                      gap={1}
                    >
                      <Tooltip title="Complete">
                        <IconButton
                          onClick={() => {
                            completeTodoMutation(currentTodo.id);
                          }}
                        >
                          <img
                            style={{ fill: "#fff" }}
                            src={CheckSvg}
                            width={30}
                            height={30}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => setUpdateDialog(true)}>
                          <img
                            style={{ fill: "#fff" }}
                            src={EditSvg}
                            width={24}
                            height={24}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => {
                            deleteTodoMutation(currentTodo.id);
                          }}
                        >
                          <img src={DeleteSvg} width={24} height={24} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  )}
                </Box>
              )}
            </Stack>
            <Box marginTop={2}>
              <Typography
                sx={{
                  marginTop: 5,
                  marginBottom: 2,
                }}
                fontWeight={"300"}
                color={"#fff"}
                variant={"h5"}
              >
                {currentTodo?.title}
              </Typography>
              <Typography
                sx={{
                  marginBottom: 2,
                }}
                fontWeight={"300"}
                color={"#fff"}
                variant={"h6"}
              >
                {currentTodo?.description}
              </Typography>
              {currentTodo?.audio && (
                <Fragment>
                  <audio
                    style={{
                      backgroundColor: "#ee5b84",
                      marginTop: 10,
                      borderRadius: 30,
                    }}
                    src={`${BASE_URL}/todos/audio/${currentTodo?.audio}`}
                    controls
                  />
                </Fragment>
              )}
            </Box>
          </Stack>
        </Fragment>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            Select a Todo to view it's details
          </Typography>
          <img src={QuestionSvg} width={"25%"} height={"25%"} />
        </Box>
      )}
      {updateDialog && (
        <TodoForm
          open={updateDialog}
          onClose={handleClose}
          id={currentTodo?.id}
        />
      )}
    </Box>
  );
};

export default Content;
