import React from "react";

const TextArea = ({ id, value, onChange, placeholder }) => (
  <textarea
    rows={5}
    id={id}
    className="flex-grow py-2.5 px-4 border-none focus:outline-none block w-full border-transparent 
    rounded-lg dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 resize-none"//removed rezise option from textarea component as it didnt look nice
    //added flex-grow so the text area took all the space in div and pushs the icons down for the resize code to work properly.
    //if i want to make it resizable again, simply remove flex-grow from icons, resize-none from text-area, remove resize code from div and overflow-hidden
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default TextArea;