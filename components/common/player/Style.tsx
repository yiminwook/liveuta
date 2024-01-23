'use client';
import { BEZIER_CURVE, boxShadow, displayNone, flexCenter } from '@/styles/var';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const PipBase = css`
  width: 350px !important;
  z-index: 50;
  position: fixed;
  left: 25px;
  bottom: 25px;
  transition: left 0.3s ${BEZIER_CURVE};

  .reactPlayer {
    ${boxShadow}
    overflow: hidden;
    border-radius: 5px;
  }
`;

export const PipButton = styled.button`
  ${displayNone}
  ${flexCenter}
  position: absolute;
  top: 0;
  right: -2.5rem;
  z-index: 10;
  padding: 0;
  margin: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0 5px 5px 0;
  color: #ff0000;
  background-color: #fff;
  transition: color 0.5s ${BEZIER_CURVE}, background-color 1s ${BEZIER_CURVE};

  &:hover {
    color: #fff;
    background-color: #ff0000;
  }
`;

export const PlayerBase = css`
  box-sizing: border-box;
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
  background-color: #424141cf;
`;

export const PlayerDiv = styled.div<{ isShow: boolean; left: boolean }>`
  position: relative;
  box-sizing: border-box;
  border: none;
  width: 100%;

  .reactPlayer {
    ${PlayerBase}
  }

  ${({ isShow }) =>
    isShow === false &&
    css`
      ${PipBase}

      & > .hideButton {
        display: block;
      }
    `}

  ${({ left }) =>
    left &&
    css`
      left: -350px;
    `}
`;

export const PlayerPlaceholderBox = styled.div`
  ${PlayerBase}
  ${flexCenter}
  flex-direction: column;
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

export const PlayerBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const PopButton = styled.button`
  position: absolute;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.25rem;
  font-size: 1.25rem;
  background-color: orange;
  font-weight: 500;
  color: #fff;
  transition: all 0.3s ${BEZIER_CURVE};
  top: 0;
  right: 0;

  &:hover {
    background-color: #ffae00d2;
  }
`;

export const LiveChatBox = styled.div`
  box-sizing: border-box;

  .liveChat {
    height: 100%;
    background-color: #000000;
  }
`;
