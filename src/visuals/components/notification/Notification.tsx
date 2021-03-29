import React, {useEffect, useState} from "react";
import {StyledNotificationContainer} from "./StyledNotificationContainer";

interface NotificationProps {
    type: "error" | "warn" | "info";
    text?: string;
}

const delay = 3500; //ms

const Notification = ({type, text = ""}: NotificationProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const content = type === "error" ? `Ooops! Something went wrong.. ${text}` : text;

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(!isVisible), delay);

        return () => {
            clearTimeout(timer);
        };
    }, [isVisible]);

    return <StyledNotificationContainer type={type} isVisible={isVisible}>{content}</StyledNotificationContainer>;
};

export default Notification;