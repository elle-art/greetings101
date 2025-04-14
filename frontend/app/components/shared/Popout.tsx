import { Button, Card, ClickAwayListener, Portal } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Height, Padding } from "@mui/icons-material";

const Popout = (props: { children?: React.ReactNode; label: string }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
            <div>
                <Button variant="contained" color="primary" onClick={handleClick} fullWidth sx={{ mt: 2 }}>
                    {props.label}
                </Button>
                {open ? (
                    <Portal container={() => document.body}>
                         <ClickAwayListener onClickAway={handleClickAway}>
                        <Card sx={{
                            mt: 34, zIndex: 1, width: '90%', position: 'absolute',
                            top: '50vh',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}>
                            <Button onClick={handleClick} sx={{
                                position: 'absolute', pt: '10px',
                                right: '-2%',
                                transform: 'translateX(-50%)',
                                color: '#fff', zIndex: 2,  '&:hover': {
                                    backgroundColor: '#ffffff80',
                                  },
                            }} >
                                <CloseIcon /></Button>
                            {props.children}
                        </Card>
                        </ClickAwayListener>
                    </Portal>
                ) : null}
            </div>
    )
}

export default Popout;
