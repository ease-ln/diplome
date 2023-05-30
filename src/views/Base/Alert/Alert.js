import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';

function AlertSuccess() {
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    const timeoutVisible = () => setTimeout(() => {
        setVisible(false);
    }, 5000);

    useEffect(() => {
        return () => {
            timeoutVisible();
        };
    })

    return (
        <Alert color="success" isOpen={visible} style={{ position: "fixed", margin: "-7px auto", width: "395px" }} toggle={onDismiss}>
            Changes were successfully saved
        </Alert>
    );
}

export default AlertSuccess;