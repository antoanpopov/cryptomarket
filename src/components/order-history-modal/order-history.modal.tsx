import React, {useContext} from 'react';
import {Box, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AppContext} from "../../store/context";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface OrderHistoryModalProps {
    isOpen: boolean,
    handleClose: () => void,
    market: string
}

export const OrderHistoryModal = ({isOpen, handleClose, market}: OrderHistoryModalProps) => {

    const {state} = useContext(AppContext);

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Latest orders for "ADD PAIR HERE" on {market.toUpperCase()}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    )
}