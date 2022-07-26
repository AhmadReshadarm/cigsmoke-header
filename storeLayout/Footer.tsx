import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import { Container, Wrapper, Content } from './common';

const Footer = (): JSX.Element => {
  return (
    <Container
      variants={variants.fadInOut}
      key="footer"
      initial="start"
      animate="middle"
      exit="end"
      flex_direction="row"
      justify_content="space-evenly"
      padding="85px 0"
      bg_color="#f5f1f1"
    >
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="center"
          align_items="space-between"
          gap="25px"
        >
          <Grid>
            <Sections_wrapper>
              <Sections_header>Персональная информация</Sections_header>
              <Sections_content>
                <Sections_item>
                  <Link href="/categories">
                    <a>
                      <span>Категории</span>
                    </a>
                  </Link>
                </Sections_item>
                <Sections_item>
                  <Link href="/acount">
                    <a>
                      <span>Личный кабинет</span>
                    </a>
                  </Link>
                </Sections_item>
                <Sections_item>
                  <Link href="/wishlist">
                    <a>
                      <span>Избранное</span>
                    </a>
                  </Link>
                </Sections_item>
                <Sections_item>
                  <Link href="/orders">
                    <a>
                      <span>Заказы</span>
                    </a>
                  </Link>
                </Sections_item>
                <Sections_item>
                  <Link href="/cart">
                    <a>
                      <span>Корзина</span>
                    </a>
                  </Link>
                </Sections_item>
              </Sections_content>
            </Sections_wrapper>
            <Sections_wrapper>
              <Sections_header>Дополнительная информация</Sections_header>
              <Sections_content>
                <Sections_item>
                  <Link href="/privacy">
                    <a>
                      <span>Политика безопасности</span>
                    </a>
                  </Link>
                </Sections_item>
                <Sections_item>
                  <Link href="/policy">
                    <a>
                      <span>Условия соглашения</span>
                    </a>
                  </Link>
                </Sections_item>
                <Sections_item>
                  <Link href="/blog">
                    <a>
                      <span>Рассылка новостей</span>
                    </a>
                  </Link>
                </Sections_item>
              </Sections_content>
            </Sections_wrapper>
            <Sections_wrapper>
              <Sections_header>Контактные данные</Sections_header>
              <Sections_content>
                <Sections_item>
                  <Image width="20" height="14" src="/icons/phone.svg" />
                  <Link href="tel:+79855675947">
                    <a>
                      <span>+7 (985) 567-59-47</span>
                    </a>
                  </Link>
                </Sections_item>
                <Sections_item>
                  <Image width="20" height="14" src="/icons/mail.svg" />
                  <Link href="mailto:info@cigsmoke.ru">
                    <a>
                      <span>info@cigsmoke</span>
                    </a>
                  </Link>
                </Sections_item>
                <Sections_item>
                  <Image
                    width="20"
                    height="14"
                    src="/icons/location-black.svg"
                  />
                  <Link href="/address">
                    <a>
                      <span>МО, г. Люберцы, Октябрьский проспект 181</span>
                    </a>
                  </Link>
                </Sections_item>
                <Sections_item>
                  <Link href="/contact">
                    <a>
                      <span>Связаться с нами</span>
                    </a>
                  </Link>
                </Sections_item>
              </Sections_content>
            </Sections_wrapper>
            <Sections_wrapper>
              <Sections_header>Способы оплаты</Sections_header>
              <Sections_content>
                <Sections_item>
                  <Image width="100" height="30" src="/icons/cart-visa.png" />
                  <Image width="54" height="33" src="/icons/cart-master.png" />
                  <Image width="110" height="35" src="/icons/cart-mir.png" />
                </Sections_item>
                <Sections_item>
                  <span style={{ padding: '5px 0' }}>
                    Вы также можете оплатить покупки наличными при получении
                  </span>
                </Sections_item>
              </Sections_content>
            </Sections_wrapper>
          </Grid>
        </Content>
      </Wrapper>
    </Container>
  );
};

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  align-items: flex-start;
`;

const Sections_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: space-between;
  gap: 15px;
`;

const Sections_header = styled.h3`
  font-size: 1.1rem;
  display: inline-block;
`;

const Sections_content = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  place-items: space-between;
  gap: 5px;
`;

const Sections_item = styled.li`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-self: flex-start;
  a {
    padding: 5px 5px 5px 0;
  }
  a:hover {
    color: ${color.hover};
  }
`;

export default Footer;
