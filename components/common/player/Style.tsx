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

export const PipBase = css`
  width: 350px !important;
  z-index: 50;
  left: 25px;
  bottom: 25px;
  position: fixed;
  overflow: hidden;
  border-radius: 5px;
`;

export const PipBox = styled.div`
  ${PipBase}
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

export const PlayerPlaceholderBox = styled.div`
  ${PlayerBase}
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;

  & > div {
    position: relative;
    box-sizing: border-box;
    margin: auto;
    width: 100%;
    height: 100%;
    overflow: hidden;

    & > img {
      object-fit: contain;
    }
  }

  & > p {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
  }
`;

export const PlayerBox = styled.div<{ pip: boolean; isShow: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;

  .reactPlayer {
    ${PlayerBase}

    ${({ isShow }) => isShow === false && PipBase}
  }
`;
