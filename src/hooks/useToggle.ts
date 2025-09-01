import { useState } from "react";

function useToggle(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const open = (data?: any) => {
    setIsOpen(data ?? true);
  };
  const close = (data?: any) => {
    setIsOpen(data ?? false);
  };
  return { toggle, isOpen, open, close };
}

export default useToggle;
