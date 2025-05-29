import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import React, {
  cloneElement,
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [openName, setOpneName] = useState('');

  const close = () => setOpneName('');
  const open = (name: string) => setOpneName(name);

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

type ModalTypes = {
  children: React.ReactNode;
  opens: string;
};

const Open: React.FC<ModalTypes> = ({ children, opens: openWindowName }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Open must be used within a Modal');
  const { open } = context;

  if (React.isValidElement<{ onClick?: () => void }>(children)) {
    return cloneElement(children, {
      onClick: () => open(openWindowName),
    });
  }
};

const Window: React.FC<{ name: string; children: ReactNode }> = ({
  children,
  name,
}) => {
  const context = useContext(ModalContext);

  if (!context) throw new Error('Open must be used within a Modal');
  const { openName, close } = context;

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>
          {React.isValidElement<{ onCloseModal: () => void }>(children)
            ? cloneElement(children, { onCloseModal: close })
            : children}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
