import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { devices } from '../lib/Devices';
import { useState, useRef, useEffect } from 'react';

interface styleProps {
  flex_direction?: string;
  justify_content?: string;
  position?: string;
  padding?: string;
  top?: string;
  z_index?: string;
  bg_color?: string;
  align_items?: string;
  gap?: string;
  boxshadow?: string;
  right?: string;
  left?: string;
  rotate?: string;
}

const Btns = styled(motion.button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  gap: 2px;
  user-select: none;
  cursor: pointer;
  span {
    font-size: 14px;
    line-height: 1;
  }
  &:hover {
    color: ${color.hover};
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: ${(p: styleProps) => p.flex_direction};
  justify-content: ${(p: styleProps) => p.justify_content};
  align-items: center;
  position: ${(p: styleProps) => p.position};
  padding: ${(p: styleProps) => p.padding};
  top: ${(p: styleProps) => p.top};
  z-index: ${(p: styleProps) => p.z_index};
  background-color: ${(p: styleProps) => p.bg_color};
`;
const Wrapper = styled.div`
  width: 100%;
  max-width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media ${devices.laptopM} {
    max-width: 1230px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(p: styleProps) => p.flex_direction};
  justify-content: ${(p: styleProps) => p.justify_content};
  align-items: ${(p: styleProps) => p.align_items};
  gap: ${(p: styleProps) => p.gap};
`;

const ItemBtns = styled(motion.button)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: ${(p: styleProps) => p.position};
  right: ${(p: styleProps) => p.right};
  left: ${(p: styleProps) => p.left};
  top: ${(p: styleProps) => p.top};
  background-color: ${(P: styleProps) => P.bg_color};
  box-shadow: 0px 2px 6px ${(P: styleProps) => P.boxshadow};
  z-index: 9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ArrowSpan = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: rotate(${(p: styleProps) => p.rotate}deg);
`;

const outsideClickListner = (
  listening: any,
  setListening: any,
  menuRef: any,
  btnRef: any,
  setIsOpen: any,
  setDisplay: any,
) => {
  return () => {
    if (listening) return;
    if (!menuRef || !btnRef) return;

    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const node = evt.target;
        if (menuRef.contains(node) || btnRef.contains(node)) return;
        setIsOpen(false);
        setTimeout(() => setDisplay('none'), 150);
      });
    });
  };
};

const outsideClickListnerTwoBtn = (
  listening: any,
  setListening: any,
  menuRef: any,
  btnRef: any,
  btnRefTwo: any,
  setIsOpen: any,
  setDisplay: any,
) => {
  return () => {
    if (listening) return;
    if (!menuRef || !btnRef || !btnRefTwo) return;

    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const node = evt.target;
        if (
          menuRef.contains(node) ||
          btnRef.contains(node) ||
          btnRefTwo.contains(node)
        )
          return;
        setIsOpen(false);
        setTimeout(() => setDisplay('none'), 100);
      });
    });
  };
};

const paginateHandler = () => {
  const widthOrHeightRef = useRef<any>();
  const [refType, setRefType]: [any, any] = useState('width');
  const [widthOrHeight, setWidthOrHeight] = useState(0);
  const [slideTo, setSlideTo] = useState(0);
  const [slideAmount, setSlideAmount] = useState(0);
  useEffect(() => {
    refType == 'width'
      ? setWidthOrHeight(
          widthOrHeightRef.current.scrollWidth -
            widthOrHeightRef.current.offsetWidth,
        )
      : setWidthOrHeight(
          widthOrHeightRef.current.scrollHeight -
            widthOrHeightRef.current.offsetHeight,
        );
  }, [refType]);

  const paginate = (direction: number) => {
    if (direction > 0) {
      slideTo > -slideAmount
        ? setSlideTo(0)
        : setSlideTo(slideTo + slideAmount);
    } else {
      slideTo < -widthOrHeight + slideAmount
        ? setSlideTo(-widthOrHeight)
        : setSlideTo(slideTo - slideAmount);
    }
  };

  return [
    setRefType,
    widthOrHeightRef,
    widthOrHeight,
    slideTo,
    paginate,
    setSlideAmount,
  ];
};

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export {
  Container,
  Wrapper,
  Content,
  Btns,
  ItemBtns,
  ArrowSpan,
  outsideClickListner,
  outsideClickListnerTwoBtn,
  swipePower,
  paginateHandler,
};
