import React, { createContext, useState, ReactNode } from "react";
import { z } from "zod";
import { AlertModalPropsScheme } from "../components/modals/AlertModal/AlertModal";

type ModalType = "alert" | "confirm" | "form" | null;

const ModalSchema = z.union([
  z.object({
    type: z.literal(null),
  }),
  z.object({
    type: z.literal("alert"),
    props: AlertModalPropsScheme,
  }),
  z.object({
    type: z.literal("confirm"),
    props: z.object({
      title: z.string(),
      message: z.string(),
      onConfirm: z.function(),
      onCancel: z.function(),
    }),
  }),
  z.object({
    type: z.literal("form"),
    props: z.object({
      title: z.string(),
      fields: z.array(
        z.object({
          id: z.string(),
          label: z.string(),
          type: z.union([z.literal("text"), z.literal("number")]),
        }),
      ),
      onSubmit: z.function(),
      onCancel: z.function(),
    }),
  }),
]);

type ModalState = z.infer<typeof ModalSchema>;

interface ModalContextType {
  showModal: <T extends ModalState>(
    type: ModalType,
    props?: T extends { props: infer P } ? P : never,
  ) => void;
  closeModal: () => void;
  modalState: ModalState;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ModalState>({ type: null });

  const showModal = <T extends ModalState>(
    type: ModalType,
    props?: T extends { props: infer P } ? P : never,
  ) => {
    const newState = { type, props } as ModalState;
    try {
      ModalSchema.parse(newState);
      setModalState(newState);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalState({ type: null });
  };
  return (
    <ModalContext.Provider value={{ showModal, closeModal, modalState }}>
      {children}
    </ModalContext.Provider>
  );
};
