import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Path, PathCircle } from './paths';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Filter from '../../../../assets/filter.svg';
import { Btns } from '../common';

const CategoryBtn = (props: any) => {
  return (
    <BtnSvg
      id="category-btn"
      ref={props.btnRef}
      onClick={() => {
        props.setOpen(!props.isOpen);
        setTimeout(() => {
          props.setDisplay(props.display == 'none' ? 'flex' : 'none');
        }, 150);
      }}
      whileHover="hover"
      whileTap="tap"
      variants={variants.boxShadow}
    >
      <svg width="21" height="15" viewBox="0 0 21 15">
        <Path
          d="M0.903992 1H2.19894M0.903992 7.40294H2.19894M0.903992 13.8059H2.19894"
          stroke="white"
          animate={{ opacity: props.isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <Path
          d="M5.5 1L20.5 1"
          stroke="white"
          animate={{ opacity: props.isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <Path
          stroke="white"
          d="M5.5 7.40295L20.5 7.40295"
          animate={{ rotate: props.isOpen ? 45 : 0 }}
        />
        <Path
          stroke="white"
          d="M5.5 7.40295L20.5 7.40295"
          animate={{ rotate: props.isOpen ? -45 : 0 }}
        />
        <Path
          stroke="white"
          d="M5.5 13.8059L12.75 13.8059"
          animate={{ opacity: props.isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </svg>
      <span style={{ color: `${color.textPrimary}`, fontSize: '1rem' }}>
        Каталог
      </span>
    </BtnSvg>
  );
};

const FilterBtn = (props: any) => {
  return (
    <>
      <FilterSelected
        style={{ display: props.selected != '' ? 'flex' : 'none' }}
        animate={props.selected != '' ? 'animate' : 'exit'}
        variants={variants.fadeInSlideIn}
        color={props.selected != '' ? color.btnPrimary : ''}
        onClick={(e) => e.preventDefault()}
      >
        {props.selected}
        <span
          style={{
            width: '25px',
            height: '25px',
            position: 'relative',
          }}
          onClick={() => {
            props.set_selected('');
          }}
        >
          <motion.span
            style={{
              width: '18px',
              height: '2px',
              backgroundColor: color.textPrimary,
              position: 'absolute',
              top: '11px',
              left: '4px',
              borderRadius: '2px',
            }}
            animate={{ rotate: props.selected ? 45 : 0 }}
            transition={{ delay: 0.15 }}
          ></motion.span>
          <motion.span
            style={{
              width: '18px',
              height: '2px',
              backgroundColor: color.textPrimary,
              position: 'absolute',
              top: '11px',
              left: '4px',
              borderRadius: '2px',
            }}
            animate={{ rotate: props.selected ? -45 : 0 }}
            transition={{ delay: 0.15 }}
          ></motion.span>
        </span>
      </FilterSelected>

      <FilterBtnWrapper
        style={{ display: props.selected == '' ? 'flex' : 'none' }}
        ref={props.btnRef}
        animate={props.selected == '' ? 'animate' : 'exit'}
        variants={variants.fadeOutSlideOut}
        onClick={(e) => {
          e.preventDefault();
          props.setOpen(true);
          props.setDisplay('flex');
        }}
      >
        <span>
          <Filter />
        </span>
      </FilterBtnWrapper>
    </>
  );
};

const AuthBtn = (props: any) => {
  const [isAnimate, setAnimate] = useState(false);

  return (
    <>
      <Btns
        style={{ display: props.isSignedIn ? 'flex' : 'none' }}
        ref={props.btnRefSecondery}
        onClick={() => {
          props.setOpen(!props.isOpen);
          setTimeout(
            () => props.setDisplay(props.display == 'none' ? 'flex' : 'none'),
            100,
          );
          props.setformType('profile');
        }}
        key="auth-profile"
        initial="init"
        animate={props.isSignedIn ? 'animate' : 'exit'}
        variants={variants.fadeInSlideIn}
      >
        <span style={{ borderRadius: '50%' }}>
          <Image src="/static/temp/gamer.png" width={25} height={25} />
        </span>

        <span>Username</span>
      </Btns>
      <Btns
        style={{ display: !props.isSignedIn ? 'flex' : 'none' }}
        ref={props.btnRef}
        onClick={() => {
          props.setOpen(!props.isOpen);
          setTimeout(
            () => props.setDisplay(props.display == 'none' ? 'flex' : 'none'),
            150,
          );
          props.setformType('step-1');
          setAnimate(!isAnimate);
          setTimeout(() => setAnimate(false), 100);
        }}
        key="auth"
        initial="init"
        animate={!props.isSignedIn ? 'animate' : 'exit'}
        variants={variants.fadeInSlideIn}
      >
        <svg width="30" height="26" viewBox="0 0 30 26" fill="none">
          <PathCircle
            animate={isAnimate ? 'animate' : 'init'}
            variants={variants.slideRight}
            d="M0.875 13.239H20.875M20.875 13.239L16.875 17.614M20.875 13.239L16.875 8.61401"
            stroke="black"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="bevel"
          />
          <PathCircle
            animate={isAnimate ? 'animate' : 'init'}
            variants={variants.fadeOut}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.0169 13.114C28.0169 19.2383 23.0521 24.203 16.9279 24.203C12.2754 24.203 8.29212 21.3379 6.64626 17.2758H5.14905C6.86317 22.1271 11.4896 25.603 16.9279 25.603C23.8253 25.603 29.4169 20.0115 29.4169 13.114C29.4169 6.21652 23.8253 0.625 16.9279 0.625C11.4896 0.625 6.86317 4.10091 5.14905 8.95227H6.64626C8.29212 4.89016 12.2754 2.025 16.9279 2.025C23.0521 2.025 28.0169 6.98972 28.0169 13.114Z"
            fill="black"
          />
        </svg>
        <span>Войти</span>
      </Btns>
    </>
  );
};

const BtnSvg = styled(motion.button)`
  width: 130px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: ${color.btnPrimary};
  border: none;
  border-radius: 8px;
  align-items: center;
  align-self: flex-end;
  user-select: none;
`;

const FilterSelected = styled(motion.button)`
  width: 90px;
  height: 30px;
  position: absolute;
  top: 8px;
  left: 5px;
  z-index: 1;
  font-size: 0.8rem;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: ${color.textPrimary};
  background: ${(props) => props.color || 'transparent'};
`;

const FilterBtnWrapper = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  top: 13px;
  left: 15px;
  z-index: 1;
  height: 22px;
  width: 35px;
`;

export { CategoryBtn, FilterBtn, AuthBtn };
