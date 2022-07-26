import Link from 'next/link';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Arrow from '../../../../assets/arrow.svg';
import Image from 'next/image';

const outsideClickListner = (
  listening: any,
  setListening: any,
  menuRef: any,
  setInput: any,
  setDisplay: any,
) => {
  return () => {
    if (listening) return;
    if (!menuRef) return;

    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const node = evt.target;
        if (menuRef.contains(node)) return;
        setInput('');
        setTimeout(() => setDisplay('none'), 150);
      });
    });
  };
};

const Search_comp = (props: any) => {
  const [display, setDisplay] = useState('none');
  const [menuRef, setMenuRef] = useState(null);
  const [listening, setListening] = useState(false);

  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      props.setInput,
      setDisplay,
    ),
  );

  useEffect(() => {
    props.input == '' ? setDisplay('none') : setDisplay('flex');
  }, [props.input]);

  return (
    <Wrapper ref={menuNode} style={{ display: display }}>
      <Content>
        {props.result.map((item: any, index: any) => {
          return (
            <Link key={index} href={`/product/${index}`}>
              <motion.a
                custom={1.05}
                whileHover="hover"
                whileTap="tap"
                variants={variants.grow}
                onClick={() => {
                  props.setResult([]);
                  props.setInput('');
                }}
              >
                <AnimatePresence>
                  <Item
                    custom={index * 0.2}
                    initial="init"
                    animate="animate"
                    exit="exit"
                    variants={variants.fadInSlideUp}
                  >
                    <Item_divider_y>
                      <Item_Wrapper_y>
                        <Image
                          src={`/static/temp/${item.image_minified}`}
                          width="60"
                          height="60"
                        />
                        <Item_divider_x>
                          <span>{item.name}</span>
                          <span>
                            {item.category}/{item.subCategory}
                          </span>
                        </Item_divider_x>
                      </Item_Wrapper_y>
                      <span>
                        <Arrow />
                      </span>
                    </Item_divider_y>
                  </Item>
                </AnimatePresence>
              </motion.a>
            </Link>
          );
        })}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  width: 525px;
  top: 75px;
  left: 0;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.box_shadow_btn};
  border-radius: 25px;
  position: absolute;
  display: flex;
  flex-directio: row;
  justify-content: center;
  align-items: center;
  user-select: none;
  padding: 10px;
`;

const Content = styled.ul`
  width: 90%;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flext-start;
  border-radius: 0 0 25px 25px;
  padding: 15px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  a {
    &:hover {
      color: ${color.hover};
    }
  }
`;

const Item = styled(motion.li)`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Item_Wrapper_y = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Item_divider_y = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Item_divider_x = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export default Search_comp;
