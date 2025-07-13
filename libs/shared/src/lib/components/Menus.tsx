import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconType } from 'react-icons';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks';

type StyledListProps = {
  children: React.ReactNode;
  position: { x: number; y: number } | null;
};

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => (props.position ? `${props.position.x}px` : `0`)};
  top: ${(props) => (props.position ? `${props.position.y}px` : `0`)};
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenuType = {
  id: number;
};

type MenuContextType = {
  openId: number | null;
  open: (id: number) => void;
  close: () => void;
  position: { x: number; y: number } | null;
  setPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
};

type MenuButtonType = {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const Menus = ({ children }: { children: React.ReactNode }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const close = () => setOpenId(null);
  const open = (id: number) => setOpenId(id);

  return (
    <MenuContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const Toggle: React.FC<MenuType> = ({ id }) => {
  const context = useContext(MenuContext);

  if (!context) throw new Error('Open must be used within a Modal');
  const { openId, open, close, setPosition } = context;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const button = target.closest('button');

    if (!button) return;

    const rect = button.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === null || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children }: { id: number; children: React.ReactNode }) => {
  const context = useContext(MenuContext);

  if (!context) throw new Error('Open must be used within a Modal');

  const { openId, position, close } = context;

  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({ children, icon, onClick }: MenuButtonType) => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('Open must be used within a Modal');
  const { close } = context;

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
