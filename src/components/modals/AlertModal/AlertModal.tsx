import { FC } from "react";
import { ModalBase } from "../ModalBase/ModalBase";
import { ModalHeader } from "../ModalHeader/ModalHeader";
import { ModalButtonArea } from "../ModalButtonArea/ModalButtonArea";
import { Button } from "../../Buttons";
import { z } from "zod";

export const AlertModalPropsScheme = z.object({
  title: z.string(),
  message: z.string(),
  onClose: z.function(),
});

export type AlertModalProps = z.infer<typeof AlertModalPropsScheme>;

export const AlertModal: FC<AlertModalProps> = ({
  title,
  message,
  onClose,
}) => {
  return (
    <ModalBase onClose={onClose}>
      <ModalHeader title={title} />
      <p>{message}</p>
      <ModalButtonArea direction="row" align="end">
        <Button onClick={onClose} variant="primary">
          Close
        </Button>
      </ModalButtonArea>
    </ModalBase>
  );
};
