'use client';
import { BEZIER_CURVE, boxShadow, COLORS, WIDTH, textLine } from '@/styles/var';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const cardBase = css`
  box-sizing: border-box;
  margin: 0;
  flex: 1 0 auto;
  width: 17rem;
  min-width: 100%;
  max-width: 100%;

  @media (min-width: ${WIDTH.SM}) {
    min-width: 17rem;
    max-width: 50%;
  }
`;

export const Card = styled.div`
  ${cardBase}
  ${boxShadow};
  display: flex;
  padding: 0.25rem;
  gap: 0.25rem;
  background-color: #fff;
  border-radius: 5px;
  transition: all 0.2s ${BEZIER_CURVE};

  &:hover {
    transform: scale(1.02);
  }

  @media (min-width: ${WIDTH.SM}) {
    flex-direction: column;
  }

  &.closed {
    background-color: ${COLORS['light-blue']};
  }

  &.stream {
    background-color: ${COLORS['light-yellow']};
  }
`;

export const CardPlaceHolderBox = styled.div`
  ${cardBase}
`;

export const ImageLink = styled.a`
  display: inline-block;
  width: 50%;

  & > div {
    ${boxShadow};
    position: relative;
    box-sizing: border-box;
    margin: auto;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 5px;
    height: 100%;
    overflow: hidden;
    background-color: #fff;

    & > img {
      object-fit: cover;
    }
  }

  @media (min-width: ${WIDTH.SM}) {
    width: 100%;
    height: 120%;
  }
`;

export const DescBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  gap: 0.1rem;

  .channelName {
    font-weight: 500;
    font-size: 1rem;

    &.stream {
      font-weight: 600;
      color: ${COLORS['highlight-font']};
    }
  }

  .title {
    color: ${COLORS.font};
    ${textLine(2, 1.25)}
    font-size: 0.75rem;

    &.stream {
      font-weight: 500;
      color: ${COLORS.secondary};
    }
  }

  .time {
    display: flex;
    font-size: 0.75rem;
    align-items: center;
    gap: 0.5rem;
  }

  .link {
    box-sizing: border-box;
    display: flex;
    gap: 0.5rem;
    font-size: 0.75rem;
    justify-content: flex-end;
    padding: 0.25rem;

    & > button {
      font-size: inherit;
      font-weight: 600;
      color: ${COLORS.salmon};
    }
  }

  @media (min-width: ${WIDTH.SM}) {
    gap: 0.5rem;

    .channelName {
      font-size: 1.2rem;
    }

    .title {
      font-size: 1rem;
    }

    .time {
      font-size: 1rem;
    }

    .link {
      font-size: 1rem;
    }
  }
`;

export const StatusBox = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 0.125rem;
  color: ${COLORS['highlight-font']};
  vertical-align: middle;
`;

export const CardSection = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  gap: 0.5rem;

  @media (min-width: ${WIDTH.SM}) {
    padding: 1rem;
    gap: 1rem;
  }
`;
