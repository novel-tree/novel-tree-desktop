import { FC } from "react";
import { useModal } from "./ModalProvider";
import { createPortal } from "react-dom";
import {
  AlertModal,
  AlertModalPropsScheme,
} from "../components/modals/AlertModal/AlertModal";

export const ModalPortal: FC = () => {
  const { modalState, closeModal } = useModal();

  if (!modalState.type) return null;
  // check props for AlertModal
  const props = AlertModalPropsScheme.parse(modalState.props);

  return createPortal(
    <AlertModal
      message={props.message}
      onClose={closeModal}
      title={props.title}
    />,
    document.getElementById("modal-root") as HTMLElement,
  );
};
