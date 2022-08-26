import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const OpenModal = ({ handleModal, handleClose }) => {
    const {open, isOrderAvailable} = handleModal;
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        isOrderAvailable ? <>
                            <Typography style={{ textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2">
                                Congratulations!
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Offer proceed successfully. Please complete the payment and wait for delivery.
                            </Typography>
                        </>
                            :
                            <>
                                <Typography style={{ textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2">
                                    Opps!
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    You must select minimum one product for order.
                                </Typography>
                            </>
                    }
                </Box>
            </Modal>
        </div>
    );
};

export default OpenModal;