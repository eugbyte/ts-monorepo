import React from "react";

interface Props {
    className?: string;
    children: JSX.Element | string;
    handleClick?: () => (Promise<void> | void);
}

export const Button: React.FC<Props> = ({handleClick, className = "", children}) => {
    return <button className={className} onClick={handleClick}>
        {children}
    </button>
}
