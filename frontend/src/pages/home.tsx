import Box from "@mui/material/Box";
import Sidebar from "../components/sidebar";
import Content from "../components/content";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Sidebar />
      {!isMobile && <Content />}
    </Box>
  );
};

export default Home;
