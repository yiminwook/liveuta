'use client';
import CloseButton from '@/components/common/button/CloseButton';
import { BEZIER_CURVE } from '@/styles/var';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player';

export const PipButton = styled.button<{ pip: boolean }>`
  position: absolute;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.25rem;
  font-size: 1.25rem;
  background-color: orange;
  font-weight: 500;
  color: #fff;
  transition: all 0.3s ${BEZIER_CURVE};
  display: block;
  top: 0;
  right: 0;

  &:hover {
    background-color: #ffae00d2;
  }

  ${({ pip }) =>
    pip &&
    css`
      display: none;
    `}
`;

export const PipCloseButton = styled(CloseButton)`
  position: absolute;
  top: 0;
  right: 0;
  color: orange;

  &:hover {
    background-color: #fff;
  }
`;

export const PipBox = styled.div`
  width: 350px;
  z-index: 50;
  left: 25px;
  bottom: 25px;
  position: fixed;
  overflow: hidden;
  border-radius: 5px;
`;

export const PlayerBase = css`
  box-sizing: border-box;
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
  background-color: #424141cf;
  overflow: hidden;
`;

export const StyledPlayer = styled(ReactPlayer)`
  ${PlayerBase}
`;

export const PlayerPlaceholder = styled.div`
  ${PlayerBase}
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  & > p {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
  }
`;

export const PlayerBox = styled.div<{ pip: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;

  .reactPlayer {
    ${PlayerBase}
  }
`;
