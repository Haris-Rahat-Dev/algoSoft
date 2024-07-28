import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import useTodosContext from "../services/hooks/useTodosContext";
import { useCallback, useEffect, useState } from "react";
import { Todo } from "../@types/types";
import IconButton from "@mui/material/IconButton";
import DeleteSvg from "../assets/delete.svg";
import { Typography } from "@mui/material";
import { BASE_URL } from "../contants";

const TodoForm: React.FC<{
  id?: number;
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose, id }) => {
  const { createTodoMutation, updateTodoMutation, currentTodo } =
    useTodosContext();
  const [updateTodo, setUpdateTodo] = useState<Todo | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioClip, setAudioClip] = useState<{
    url: string;
    blob?: Blob;
    name: string;
  } | null>(null);
  const [audioName, setAudioName] = useState<string>("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (id && currentTodo) {
      setUpdateTodo(currentTodo);
      if (currentTodo?.audio) {
        setAudioClip({
          url: `${BASE_URL}/${currentTodo?.audio}`,
          blob: undefined,
          name: currentTodo?.audio || "",
        });
        setAudioName(currentTodo?.audio || "");
      }
    }
  }, [currentTodo, id]);

  // Cleanup function to stop all media tracks when the component unmounts
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          const audioBlob = new Blob([event.data], { type: "audio/wav" });
          const url = URL.createObjectURL(audioBlob);
          const name = `${Date.now()}.wav`;
          setAudioClip({ url, blob: audioBlob, name });
          setAudioName(name);
        }
      };
      mediaRecorder.onstop = () => {
        // Stop all media tracks when the recording stops
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }
      };
    }
  }, [mediaRecorder, mediaStream]);

  const startRecording = useCallback(async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaStream(stream);
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }, [mediaRecorder]);

  const deleteRecording = useCallback(() => {
    setAudioClip(null);
    setAudioName("");
  }, []);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      if (audioClip && audioClip.blob) {
        formData.append("audioFile", audioClip.blob, audioClip.name);
      }
      formData.append("audio", audioName);

      if (id) {
        updateTodoMutation({ formData, id });
      } else {
        createTodoMutation(formData);
      }
      onClose();
    },
    [audioClip, audioName, createTodoMutation, id, onClose, updateTodoMutation]
  );

  return (
    <Dialog
      onClose={isRecording ? undefined : onClose}
      open={open}
      PaperProps={{
        component: "form",
        onSubmit: handleFormSubmit,
      }}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: "80%",
            md: "60%",
            lg: "40%",
            xl: "30%",
          },
        },
      }}
    >
      <DialogTitle>{id ? "Update Todo" : "Create Todo"}</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <TextField
            fullWidth
            multiline
            id="outlined-basic"
            label="Title"
            variant="standard"
            name="title"
            defaultValue={updateTodo?.title ?? ""}
            required
          />
          <TextField
            fullWidth
            multiline
            id="outlined-basic"
            label="Description"
            variant="standard"
            name="description"
            defaultValue={updateTodo?.description ?? ""}
            required
          />
          <Typography>Record Audio</Typography>
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant="contained"
            color={isRecording ? "secondary" : "primary"}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          {audioClip && (
            <Stack direction="row" spacing={1} alignItems="center">
              <audio
                style={{
                  backgroundColor: "#ee5b84",
                  marginTop: 10,
                  borderRadius: 30,
                }}
                controls
              >
                <source src={audioClip.url} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <IconButton onClick={() => deleteRecording()} aria-label="delete">
                <img src={DeleteSvg} width={24} height={24} />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={isRecording} onClick={onClose}>
          Close
        </Button>
        <Button disabled={isRecording} type="submit">
          {id ? "Update Todo" : "Save changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoForm;
