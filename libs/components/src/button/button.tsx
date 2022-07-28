import React from "react";

interface Props {
    children: JSX.Element | string;
    handleClick?: () => (Promise<void> | void);
}

export const Button: React.FC<Props> = ({handleClick, children}) => {
    return <button className="border-2 border-red-400" onClick={handleClick}>
        {children}
    </button>
}
