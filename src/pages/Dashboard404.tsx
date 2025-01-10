import { Typography } from "@mui/material";

const Dashboard404 = () => {
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center p-10">
      {" "}
      <Typography variant="h4" color="primary" gutterBottom>
        Oops! Dashboard Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        The page you're looking for doesn't exist or is currently unavailable.
      </Typography>
    </div>
  );
};

export default Dashboard404;
