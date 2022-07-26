import Link from 'next/link';
import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { Btns, outsideClickListner } from '../common';
import Cart from '../../../../assets/cart.svg';
import Close from '../../../../assets/close_black.svg';

const fake_data = [
  {
    name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: '109.95',
  },
  {
    name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: '109.95',
  },
  {
    name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: '109.95',
  },
  {
    name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: '109.95',
  },
  {
    name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: '109.95',
  },
];

const ItemCounter = () => {
  const [itemCounter, setItemCounter]: [any, any] = useState(1);

  return (
    <>
      <Item_counter_wrapper onClick={(e) => e.preventDefault()}>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          onClick={() => setItemCounter(itemCounter < 2 ? 1 : itemCounter - 1)}
        >
          -
        </motion.button>
        <input
          onChange={(e) =>
            e.target.value == ''
              ? setItemCounter(e.target.value)
              : setItemCounter(parseInt(e.target.value))
          }
          value={itemCounter}
          type="number"
          min={1}
        />
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          onClick={() =>
            setItemCounter(itemCounter == '' ? 1 : itemCounter + 1)
          }
        >
          +
        </motion.button>
      </Item_counter_wrapper>
    </>
  );
};

const CartComp = () => {
  const [data, setData]: [any, any] = useState([]);
  const [isEmpty, setEpmty] = useState(false);
  const [cartCounter, setCartCounter] = useState(0);

  // _______________menu hooks _______________
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
    setCartCounter(data.length);
    data.length == 0 ? setEpmty(true) : setEpmty(false);
  }, [data]);

  useEffect(() => {
    setData([...fake_data]);
  }, []);

  const closeHandler = () => {
    setOpen(!isOpen);
    setTimeout(() => {
      setDisplay(display == 'none' ? 'flex' : 'none');
    }, 100);
  };

  return (
    <>
      {cartCounter == 0 ? '' : <Counter>{cartCounter}</Counter>}
      <Btns ref={btnNode} id="cart-btn" onClick={() => closeHandler()}>
        <span>
          <Cart />
        </span>
        <span>Корзина</span>
      </Btns>
      <PopUp_wrapper
        ref={menuNode}
        style={{ display: display }}
        animate={isOpen ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        {isEmpty ? (
          <span style={{ color: color.hover }}>Корзина пуста</span>
        ) : (
          <Popup_divider>
            <PopUp_content>
              {data.map((item: any, index: any) => {
                return (
                  <Link key={index} href={`/product/${index}`}>
                    <a>
                      <Item>
                        <motion.img
                          whileHover="hover"
                          whileTap="tap"
                          custom={1.05}
                          variants={variants.grow}
                          src="/static/backpack.jpg"
                          onClick={() => closeHandler()}
                        />
                        <Item_details onClick={() => closeHandler()}>
                          <h4>{item.name}</h4>
                          <Item_detial_divider>
                            <h3>{item.price}₽</h3>
                          </Item_detial_divider>
                        </Item_details>
                        <ItemCounter />
                        <motion.button
                          custom={1.1}
                          whileTap="tap"
                          whileHover="hover"
                          variants={variants.grow}
                          onClick={(e) => {
                            e.preventDefault();
                            setData(
                              data.filter((remove: any) => remove != item),
                            );
                          }}
                        >
                          <Close />
                        </motion.button>
                      </Item>
                    </a>
                  </Link>
                );
              })}
            </PopUp_content>
            <Popup_btns_divider>
              <Link href="/">
                <a onClick={() => closeHandler()}>
                  <Action_btns
                    whileHover="hover"
                    whileTap="tap"
                    variants={variants.boxShadow}
                  >
                    Перейти в корзину
                  </Action_btns>
                </a>
              </Link>
              <Link href="/">
                <a onClick={() => closeHandler()}>
                  <Action_btns
                    whileHover="hover"
                    whileTap="tap"
                    variants={variants.boxShadow}
                  >
                    Перейти к оформлению
                  </Action_btns>
                </a>
              </Link>
            </Popup_btns_divider>
          </Popup_divider>
        )}
      </PopUp_wrapper>
    </>
  );
};

const Counter = styled.span`
  position: absolute;
  top: -10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${color.rating};
  color: ${color.textPrimary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  user-select: none;
`;

const PopUp_wrapper = styled(motion.div)`
  width: 450px;
  height: 350px;
  position: absolute;
  top: 70px;
  right: 0px;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 10px ${color.box_shadow_btn};
  overflow: hidden;
  user-select: none;
`;

const Popup_divider = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Popup_btns_divider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
  a {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const PopUp_content = styled(motion.ul)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  gap: 10px;
  ::-webkit-scrollbar {
    width: 10px;
  }
  a {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 10px 10px 0;
    position: relative;
  }
`;

const Item = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  img {
    width: 80px;
    height: 80px;
    min-width: 70px;
  }
  button {
    justify-self: flex-end;
    align-self: flex-start;
    width: 30px;
    height: 30px;
  }
`;

const Item_details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  h4 {
    font-size: 0.8rem;
    font-weight: 400;
    margin: 0;
  }
  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
  }
`;

const Item_detial_divider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Item_counter_wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  aling-items: center;
  gap: 5px;
  position: absolute;
  right: 18px;
  top: 55px;
  button {
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
  }

  input {
    width: 25px;
    height: 25px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid ${color.btnPrimary};
    background-color: ${color.textPrimary};
    color: ${color.btnPrimary};
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const Action_btns = styled(motion.button)`
  width: 90%;
  height: 45px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default CartComp;
