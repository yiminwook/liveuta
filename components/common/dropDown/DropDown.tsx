import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { GoTriangleDown } from 'react-icons/go';

const StyleDropDown = styled.div<{ open: boolean; height: string; width: string }>`
  position: relative;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    gap: 0.5rem;

    span {
      svg {
        transition: all 0.2s ease;
        transform: ${({ open }) => (open ? 'rotate(-180deg)' : 'rotate(0deg)')};
      }
    }
  }

  & > div:nth-child(2) {
    width: 100%;
    transition: max-height 0.2s ease;
    position: absolute;
    overflow: hidden;
    max-height: ${({ open }) => (open ? '100vh' : '0')};
    background-color: var(--liveuta-bg-color-light);
    color: var(--liveuta-default-text-color);
    border-radius: 0 0 0.5rem 0.5rem;

    & > div {
      padding: 0.5rem;

      ul {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
    }
  }
`;

interface DropDownProps {
  title: string;
  children: ReactNode;
  width?: string;
  height?: string;
}

const DropDown = ({ children, width = 'auto', height = '2.5rem', title }: DropDownProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((pre) => !pre);
  };

  return (
    <StyleDropDown width={width} height={height} open={open}>
      <button onClick={handleToggle}>
        <h3>{title}</h3>
        <span>
          <GoTriangleDown size="1rem" color="inherit" />
        </span>
      </button>
      <div className={open ? 'open' : ''}>
        <div>{children}</div>
      </div>
    </StyleDropDown>
  );
};

export default DropDown;
