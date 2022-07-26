import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Btns,
  Container,
  Content,
  Wrapper,
  outsideClickListner,
} from './common';
import AuthComp from './utils/AuthComp';
import CartComp from './utils/CartComp';
import FilterComp from './utils/FilterComp';
import SearchComp from './utils/SearchComp';
import CategoryComp from './utils/CategoryComp';
import { FilterBtn } from './utils/AnimatedBtns';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import Pointer from '../../../assets/pointer.svg';
import Logo from '../../../assets/logo.svg';
import Search from '../../../assets/search.svg';
import Order from '../../../assets/order.svg';
import WishList from '../../../assets/wishlist.svg';

interface props {
  padding?: string;
}

const fake_data = [
  {
    name: 'darkside',
    image_minified: 'tabak.png',
    url: '',
    category: 'Кальяны',
    subCategory: 'Табак',
  },
  {
    name: 'darkside',
    image_minified: 'tabak.png',
    url: '',
    category: 'Кальяны',
    subCategory: 'Табак',
  },
  {
    name: 'darkside',
    image_minified: 'tabak.png',
    url: '',
    category: 'Кальяны',
    subCategory: 'Табак',
  },
  {
    name: 'darkside',
    image_minified: 'tabak.png',
    url: '',
    category: 'Кальяны',
    subCategory: 'Табак',
  },
  {
    name: 'darkside',
    image_minified: 'tabak.png',
    url: '',
    category: 'Кальяны',
    subCategory: 'Табак',
  },
  {
    name: 'darkside',
    image_minified: 'tabak.png',
    url: '',
    category: 'Кальяны',
    subCategory: 'Табак',
  },
];

const Header = () => {
  // __________ Filter hooks______________
  const [openFilter, setOpenFilter] = useState(false);
  const [displayFilter, setDisplayFilter] = useState('none');
  const [selectedFilter, setSelectedFilter] = useState('');
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
      setOpenFilter,
      setDisplayFilter,
    ),
  );
  // ____________________________________

  const [result, setResult]: [any, any] = useState([]);
  const [input, setInput] = useState('');
  const handleChange = (event: any) => {
    event.preventDefault();
    setInput(event.target.value);
    if (event.target.value === '') return setResult([]);
    for (let i = 0; i < fake_data.length; i++) {
      if (fake_data[i].name.match(event.target.value)) {
        setResult([...fake_data]);
      }
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container
        variants={variants.fadInOut}
        key="header"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        padding="10px 0 20px 0"
        position="sticky"
        top="0"
        z_index="20"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="row"
            justify_content="space-between"
            align_items="center"
          >
            <LogoWrapper>
              <LocationBtn
                whileHover="hover"
                whileTap="tap"
                custom={1.05}
                variants={variants.grow}
              >
                <span>
                  <Pointer />
                </span>
                <span style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                  Выберите ваш город
                </span>
              </LocationBtn>
              <Link href="/">
                <a>
                  <Logo />
                </a>
              </Link>
            </LogoWrapper>
            <RelitiveContainer>
              <CategoryComp />
            </RelitiveContainer>

            <SearchWrapper>
              <SearchField
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                onChange={handleChange}
                type="input"
                value={input}
                padding={
                  selectedFilter == '' ? '0 80px 0 40px' : '0 80px 0 100px'
                }
              />
              <SearchBtn onClick={(e) => e.preventDefault()}>
                <span>
                  <Search />
                </span>
              </SearchBtn>
              <SearchComp
                result={result}
                setResult={setResult}
                setInput={setInput}
                input={input}
              />
              <FilterBtn
                selected={selectedFilter}
                set_selected={setSelectedFilter}
                setOpen={setOpenFilter}
                isOpen={openFilter}
                display={displayFilter}
                setDisplay={setDisplayFilter}
                btnRef={btnNode}
              />
            </SearchWrapper>
            <RelitiveContainer id="auth-container">
              <AuthComp />
            </RelitiveContainer>
            <Btns>
              <span>
                <Order />
              </span>
              <span> Заказы</span>
            </Btns>
            <Btns>
              <span>
                <WishList />
              </span>
              <span>Избранное</span>
            </Btns>
            <RelitiveContainer>
              <CartComp />
            </RelitiveContainer>
          </Content>
        </Wrapper>
        <FilterComp
          set_selected={setSelectedFilter}
          isOpen={openFilter}
          setOpen={setOpenFilter}
          display={displayFilter}
          setDisplay={setDisplayFilter}
          menuRef={menuNode}
        />
      </Container>
    </>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 15px;
  justify-self: flex-start;
`;

const LocationBtn = styled(motion.button)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: none;
  padding: 5px 5px 5px 0;
  gap: 5px;
`;

const SearchWrapper = styled.form`
  width: 525px;
  height: 45px;
  position: relative;
  align-self: flex-end;
`;

const SearchField = styled(motion.input)`
  width: 525px;
  height: 45px;
  border: 1px solid ${color.btnPrimary};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: ${(p: props) => p.padding};
`;

const SearchBtn = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background: ${color.btnPrimary};
  width: 80px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0px 10px 10px 0px;
  span {
    width: 22px;
    height: 22px;
  }
`;

const RelitiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  position: relative;
`;

export default Header;
