import { useState } from "react";

export default function useToggle() {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  return {
    show,
    handleShow,
    handleClose,
  };
}
