import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { CategoryBtn } from './AnimatedBtns';
import { outsideClickListner } from '../common';
import axios from 'axios';
import Arrow from '../../../../assets/arrow.svg';

interface props {
  font_size?: string;
  font_wight?: string;
  padding?: string;
  bg_color?: string;
}
const fake_data = [
  { icon: 'hookah', catName: 'Кальяны' },
  { icon: 'glass', catName: 'Стеклянные курительные трубки' },
  { icon: 'vape', catName: 'Электронные сигареты' },
  { icon: 'liquad', catName: 'Солевая жидкость' },
  { icon: 'holder', catName: 'Пепельницы' },
  { icon: 'cigar', catName: 'Табак' },
];

const CategoryComp = () => {
  const [data, setData] = useState([]);
  const [sub_menu, set_sub_menu] = useState('electronics');
  const [sub_data, set_sub_data] = useState([]);

  // _______________________menu hooks_________________________
  const [isOpen, setOpen] = useState(false);
  const [display, setDisplay] = useState('none');
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);

  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setOpen,
      setDisplay,
    ),
  );

  useEffect(() => {
    let trimed = sub_menu.trim();
    axios
      .get(`https://fakestoreapi.com/products/category/${trimed}`)
      .then((res) => {
        set_sub_data(res.data);
      });
  }, [sub_menu]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products/categories')
      .then((res) => setData(res.data));
    axios
      .get('https://fakestoreapi.com/products/category/jewelery')
      .then((res) => {
        set_sub_data(res.data);
      });
  }, []);
  return (
    <>
      <CategoryBtn
        isOpen={isOpen}
        setOpen={setOpen}
        display={display}
        setDisplay={setDisplay}
        btnRef={btnNode}
      />
      <Wrapper
        id="category-wrapper"
        style={{ display: display }}
        animate={isOpen ? 'open' : 'close'}
        variants={variants.fadeInReveal}
        ref={menuNode}
      >
        <Wrapper_grid>
          <Wrapper_menu padding="0" bg_color={color.bg_product}>
            {data.map((item, index) => {
              return (
                <Link key={index} href="">
                  <a>
                    <Row_flex
                      onHoverStart={() => set_sub_menu(item)}
                      key={index}
                      custom={index * 0.1}
                      animate={isOpen ? 'animate' : 'exit'}
                      variants={variants.fadInSlideUp}
                      font_size="1rem"
                      font_wight="600"
                      padding="15px 20px"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 1 }}
                    >
                      <Image
                        src={`/static/temp/${fake_data[index].icon}.svg`}
                        width="20"
                        height="20"
                      />
                      <span id="main-category">{item}</span>
                      <span>
                        <Arrow />
                      </span>
                    </Row_flex>
                  </a>
                </Link>
              );
            })}
          </Wrapper_menu>
          <Wrapper_menu padding="20px 0" bg_color={color.textPrimary}>
            {sub_data.map((item: any, index) => {
              return (
                <Link key={index} href="">
                  <a>
                    <Row_flex
                      key={index}
                      custom={index * 0.2}
                      animate={isOpen ? 'animate' : 'exit'}
                      variants={variants.fadInSlideUp}
                      font_size="0.875rem"
                      font_wight="400"
                      padding="10px"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 1 }}
                    >
                      <span>{item.title}</span>
                    </Row_flex>
                  </a>
                </Link>
              );
            })}
          </Wrapper_menu>
          <Wrapper_brands>
            {sub_data.map((item: any, index) => {
              return (
                <Link key={index} href="">
                  <motion.a
                    key={index}
                    custom={index * 0.1}
                    animate={isOpen ? 'animate' : 'exit'}
                    variants={variants.fadInSlideUp}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 1 }}
                  >
                    <li>
                      <img src={item.image} />
                    </li>
                  </motion.a>
                </Link>
              );
            })}
          </Wrapper_brands>
        </Wrapper_grid>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 70px;
  left: 0;
  width: 800px;
  height: 400px;
  border-radius: 25px;
  background-color: ${color.textPrimary};
  box-shadow: 0 0 6px 6px ${color.box_shadow};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Wrapper_grid = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  display: grid;
  grid-template-columns: 2.2fr 2.5fr 2.5fr;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 35px;
`;

const Wrapper_menu = styled.ul`
  height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${(p: props) => p.bg_color};
  padding: ${(p: props) => p.padding};
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
  a {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Row_flex = styled(motion.li)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(p: props) => p.padding};
  span {
    font-size: ${(p: props) => p.font_size};
    font-weight: ${(p: props) => p.font_wight};
  }

  &:hover {
    color: ${color.hover};
    background-color: ${color.textPrimary};
  }
  #main-category {
    width: 100%;
    padding: 0 0 0 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const Wrapper_brands = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  a {
    display: flex;
    flex-directio: row;
    justify-content: center;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 15px;
    }
  }
`;

export default CategoryComp;
