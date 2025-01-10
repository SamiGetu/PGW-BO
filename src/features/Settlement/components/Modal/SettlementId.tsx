import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SettlementModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    onClose();
    navigate("/finalize-settlements");
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Enter Settlement ID</DialogTitle>
      <DialogContent>
        <TextField
          label="Settlement ID"
          fullWidth
          variant="outlined"
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} color="secondary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettlementModal;
