import React from "react";

const TextInput: React.FC<{type?: "text" | "password", name: string}> = ({type = "text", name}) => {
    return (
        <input type={type} className="rounded border" name={name} id={name}/>
    );
};

export default TextInput;
