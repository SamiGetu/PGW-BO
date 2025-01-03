import { Box, Typography } from "@mui/material";

const Dashboard404 = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      p={30}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Oops! Dashboard Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        The page you're looking for doesn't exist or is currently unavailable.
      </Typography>
    </Box>
  );
};

export default Dashboard404;
