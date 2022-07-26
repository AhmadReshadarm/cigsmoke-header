import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Close from '../../../../assets/close_black.svg';
import Image from 'next/image';

const fake_data = [
  { icon: 'hookah', catName: 'Кальяны' },
  { icon: 'glass', catName: 'Стеклянные курительные трубки' },
  { icon: 'vape', catName: 'Электронные сигареты' },
  { icon: 'liquad', catName: 'Солевая жидкость' },
  { icon: 'holder', catName: 'Пепельницы' },
  { icon: 'cigar', catName: 'Табак' },
];

const FilterComp = (props: any) => {
  return (
    <AnimatePresence>
      <Wrapper style={{ display: props.display }}>
        <Content
          ref={props.menuRef}
          initial="init"
          animate={props.isOpen ? 'animate' : 'exit'}
          custom={0.2}
          variants={variants.fadInSlideUp}
          id="filter-content"
        >
          <motion.button
            custom={1.1}
            whileTap="tap"
            whileHover="hover"
            variants={variants.grow}
            onClick={() => {
              props.setOpen(false);
              setTimeout(() => props.setDisplay('none'), 150);
            }}
          >
            <Close />
          </motion.button>
          <ContentInner>
            {fake_data.map((item: any, index: any) => {
              return (
                <motion.li
                  initial="init"
                  animate={props.isOpen ? 'animate' : 'exit'}
                  custom={index * 0.15}
                  variants={variants.fadInSlideUp}
                  key={index}
                  onClick={() => {
                    props.set_selected(`${item.catName.slice(0, 5)}..`);
                    props.setOpen(false);
                    setTimeout(() => props.setDisplay('none'), 150);
                  }}
                >
                  <Image
                    src={`/static/temp/${item.icon}.svg`}
                    width="20"
                    height="20"
                  />
                  <span>{item.catName}</span>
                </motion.li>
              );
            })}
          </ContentInner>
        </Content>
      </Wrapper>
    </AnimatePresence>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${color.box_shadow_btn};
  position: absolute;
  display: flex;
  flex-directio: row;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Content = styled(motion.div)`
  width: 500px;
  height: 500px;
  background-color: ${color.textPrimary};
  border-radius: 25px;
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
  position: relative;
  button {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
  }
`;

const ContentInner = styled.ul`
  width: 85%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  li {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    padding: 5px 5px 5px 0;
    &:hover {
      color: ${color.hover};
    }
  }
`;

export default FilterComp;
