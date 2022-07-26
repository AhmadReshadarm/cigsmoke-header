import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthBtn } from './AnimatedBtns';
import { outsideClickListnerTwoBtn } from '../common';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Arrow from '../../../../assets/arrow_white.svg';
import Cards from '../../../../assets/creditCard.svg';
import Bookmark from '../../../../assets/bookmark.svg';

interface props {
  width?: string;
  rotate?: string;
}

const validateEmail = (email: any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const AuthComp = () => {
  const [formType, setformType] = useState('step-1');
  const [[page, direction], setPage] = useState([0, 0]);
  const [isSignedIn, setSignedIn] = useState(false);

  // ________________menu hooks_____________________
  const [isOpen, setOpen] = useState(false);
  const [display, setDisplay] = useState('none');
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [seconderyBtnRef, setSecondery] = useState(null);
  const [listening, setListening] = useState(false);

  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);
  const btnSecondryNode = useCallback((node: any) => {
    setSecondery(node);
  }, []);

  useEffect(
    outsideClickListnerTwoBtn(
      listening,
      setListening,
      menuRef,
      btnRef,
      seconderyBtnRef,
      setOpen,
      setDisplay,
    ),
  );

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const ProfileComp = () => {
    return (
      <AuthContent
        key={page}
        custom={direction}
        variants={variants.slider_auth}
        initial="enter"
        animate="center"
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.4 },
        }}
      >
        <ProfileWrapper>
          <AuthDevider style={{ justifyContent: 'flex-start' }}>
            <Link href="/lk">
              <a>
                <motion.img src="/static/temp/gamer.png" />
              </a>
            </Link>
            <ProfileDataWrapper>
              <h3>Username</h3>
              <span>user@mail.com</span>
              <Link href="/user-data">
                <a>
                  <b>Личные данные</b>
                </a>
              </Link>
            </ProfileDataWrapper>
          </AuthDevider>
        </ProfileWrapper>

        <Link href="/cards">
          <motion.a
            whileHover="hover"
            whileTap="tap"
            custom={1.04}
            variants={variants.grow}
            style={{ alignSelf: 'flex-start' }}
          >
            <AuthDevider style={{ justifyContent: 'flex-start' }}>
              <Cards />
              <span style={{ fontWeight: '500', color: color.btnPrimary }}>
                Мои карты
              </span>
            </AuthDevider>
          </motion.a>
        </Link>
        <Link href="/bookmarks">
          <motion.a
            whileHover="hover"
            whileTap="tap"
            custom={1.04}
            variants={variants.grow}
            style={{ alignSelf: 'flex-start' }}
          >
            <AuthDevider style={{ justifyContent: 'flex-start' }}>
              <Bookmark />
              <span style={{ fontWeight: '500', color: color.btnPrimary }}>
                Любимые бренды
              </span>
            </AuthDevider>
          </motion.a>
        </Link>

        <AuthBtns
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          width="100"
          onClick={() => {
            setformType('step-1');
            paginate(1);
            setSignedIn(false);
          }}
        >
          Выйти
        </AuthBtns>
      </AuthContent>
    );
  };

  const SignInComp = () => {
    const [email, setEmail]: [any, any] = useState('');
    const [psw, setPsw] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pswErr, setPswErr] = useState(false);
    return (
      <AuthForm>
        <h4>
          <span>Введите свой Логен и Пароль, чтобы войти</span>
        </h4>
        <span style={{ color: color.hover, fontSize: '0.875rem' }}>
          {emailErr ? 'Неправильный логин' : ''}
        </span>
        <span style={{ color: color.hover, fontSize: '0.875rem' }}>
          {pswErr ? 'Пароль не может быть пустым' : ''}
        </span>
        <AuthFeildsWrapper>
          <label htmlFor="signin-email">
            <b>
              <span>Логин</span>
            </b>
          </label>
          <AuthFeilds
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder="Логин"
            width="90"
            type="email"
            id="signin-email"
            value={email}
            style={{
              border: emailErr
                ? `solid 1px ${color.hover}`
                : `solid 1px ${color.btnPrimary}`,
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailErr(false);
            }}
          />
        </AuthFeildsWrapper>
        <AuthFeildsWrapper>
          <label htmlFor="signin-pws">
            <b>
              <span>Пароль</span>
            </b>
          </label>
          <AuthFeilds
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder="Пароль"
            width="90"
            type="password"
            id="signin-pws"
            style={{
              border: pswErr
                ? `solid 1px ${color.hover}`
                : `solid 1px ${color.btnPrimary}`,
            }}
            value={psw}
            onChange={(e) => {
              setPsw(e.target.value);
              setPswErr(false);
            }}
          />
        </AuthFeildsWrapper>
        <Link href="">
          <a style={{ alignSelf: 'flex-start', color: color.hover }}>
            Забыл пароль
          </a>
        </Link>
        <AuthDevider>
          <AuthBtns
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            width="100"
            onClick={(e) => {
              e.preventDefault();
              paginate(-1);
              setformType('step-1');
            }}
          >
            <ArrowSpan rotate="180">
              <Arrow />
            </ArrowSpan>
            Назад
          </AuthBtns>
          <AuthBtns
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            width="100"
            onClick={(e) => {
              e.preventDefault();
              if (validateEmail(email) && psw != '') {
                paginate(1);
                setformType('signed-in');
                setSignedIn(!isSignedIn);
              } else {
                !validateEmail(email) ? setEmailErr(true) : setPswErr(true);
              }
            }}
          >
            Войти
          </AuthBtns>
        </AuthDevider>
      </AuthForm>
    );
  };
  const SignUpComp = () => {
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [confirmPsw, setConfirmPsw] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pswErr_1, setPswErrOne] = useState(false);
    const [pswErr_2, setPswErrTwo] = useState(false);
    const [serverErr, setServerErr] = useState(false);
    return (
      <>
        {formType == 'signup-1' ? (
          <AuthForm
            key={page}
            custom={direction}
            variants={variants.slider_auth}
            initial="enter"
            animate="center"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
          >
            <AuthDevider>
              <AuthFeildsWrapper>
                <label htmlFor="name">
                  <b>
                    <span>Имя</span>
                  </b>
                </label>
                <AuthFeilds
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  placeholder="Имя"
                  id="name"
                />
              </AuthFeildsWrapper>
              <AuthFeildsWrapper>
                <label htmlFor="family">
                  <b>
                    <span>Фамилия</span>
                  </b>
                </label>
                <AuthFeilds
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  placeholder="Фамилия"
                  id="family"
                />
              </AuthFeildsWrapper>
            </AuthDevider>
            <AuthFeildsWrapper>
              <label htmlFor="email">
                <b>
                  <span>Эл. адрес</span>
                </b>
              </label>
              <AuthFeilds
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                placeholder="Эл. адрес"
                type="email"
                id="email"
                value={email}
                style={{
                  border: emailErr
                    ? `solid 1px ${color.hover}`
                    : `solid 1px ${color.btnPrimary}`,
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErr(false);
                }}
              />
            </AuthFeildsWrapper>
            <span style={{ color: color.hover, fontSize: '0.875rem' }}>
              {emailErr ? 'Неправильный эл. адрес' : ''}
            </span>
            <AuthDevider>
              <AuthBtns
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                width="100"
                onClick={(e) => {
                  e.preventDefault();
                  paginate(-1);
                  setformType('step-1');
                }}
              >
                <ArrowSpan rotate="180">
                  <Arrow />
                </ArrowSpan>
                Назад
              </AuthBtns>
              <AuthBtns
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                width="100"
                onClick={(e) => {
                  e.preventDefault();
                  if (validateEmail(email)) {
                    paginate(1);
                    setformType('signup-2');
                  } else {
                    setEmailErr(true);
                  }
                }}
              >
                Следующий
                <ArrowSpan rotate="0">
                  <Arrow />
                </ArrowSpan>
              </AuthBtns>
            </AuthDevider>
          </AuthForm>
        ) : formType == 'signup-2' ? (
          <AuthForm
            key={page}
            custom={direction}
            variants={variants.slider_auth}
            initial="enter"
            animate="center"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
          >
            <AuthFeildsWrapper>
              <label htmlFor="psw">
                <b>
                  <span>Пароль</span>
                </b>
              </label>
              <AuthFeilds
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                placeholder="Пароль"
                type="password"
                id="psw"
                value={psw}
                onChange={(e) => {
                  setPsw(e.target.value);
                  setPswErrOne(false);
                  setPswErrTwo(false);
                }}
              />
            </AuthFeildsWrapper>
            <AuthFeildsWrapper>
              <label htmlFor="psw-repeat">
                <b>
                  <span>Повторите пароль</span>
                </b>
              </label>
              <AuthFeilds
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                placeholder="Повторите пароль"
                type="password"
                id="psw-repeat"
                value={confirmPsw}
                onChange={(e) => {
                  setConfirmPsw(e.target.value);
                  setPswErrOne(false);
                  setPswErrTwo(false);
                }}
              />
            </AuthFeildsWrapper>
            <span style={{ color: color.hover, fontSize: '0.875rem' }}>
              {pswErr_1 ? 'Пароль не может быть пустым' : ''}
            </span>
            <span style={{ color: color.hover, fontSize: '0.875rem' }}>
              {pswErr_2 ? 'Пароль не совпадает' : ''}
            </span>
            <AuthDevider>
              <AuthBtns
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                width="100"
                onClick={(e) => {
                  e.preventDefault();
                  paginate(-1);
                  setformType('signup-1');
                }}
              >
                <ArrowSpan rotate="180">
                  <Arrow />
                </ArrowSpan>
                Назад
              </AuthBtns>
              <AuthBtns
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                width="140"
                onClick={(e) => {
                  e.preventDefault();
                  if (psw === confirmPsw && psw != '' && confirmPsw != '') {
                    paginate(1);
                    setformType('signed-up');
                    // setSignedIn(!isSignedIn);
                  } else {
                    psw == '' || confirmPsw == ''
                      ? setPswErrOne(true)
                      : setPswErrTwo(true);
                  }
                }}
              >
                регистрироваться
              </AuthBtns>
            </AuthDevider>
          </AuthForm>
        ) : (
          <AuthForm
            key={page}
            custom={direction}
            variants={variants.slider_auth}
            initial="enter"
            animate="center"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
          >
            {serverErr ? (
              <>
                <span>server error messege gose here</span>
                <AuthBtns
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  width="100"
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(-1);
                    setformType('signup-1');
                  }}
                >
                  <ArrowSpan rotate="180">
                    <Arrow />
                  </ArrowSpan>
                  Назад
                </AuthBtns>
              </>
            ) : (
              <>
                <span style={{ textAlign: 'center' }}>
                  <b>Пожалуйста, проверьте электронный почтовый ящик</b>
                </span>
                <span style={{ textAlign: 'center' }}>
                  вам выслано подтверждение
                </span>
              </>
            )}
          </AuthForm>
        )}
      </>
    );
  };

  return (
    <>
      <AuthBtn
        btnRef={btnNode}
        btnRefSecondery={btnSecondryNode}
        setOpen={setOpen}
        isOpen={isOpen}
        display={display}
        setDisplay={setDisplay}
        isSignedIn={isSignedIn}
        setformType={setformType}
        // avatar={} Todo pass the profile avatar
      />
      <AuthWrapper
        ref={menuNode}
        style={{ display: display }}
        animate={isOpen ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        <AnimatePresence>
          {isSignedIn ? (
            <ProfileComp />
          ) : formType == 'step-1' ? (
            <AuthContent
              key={page}
              custom={direction}
              variants={variants.slider_auth}
              initial="enter"
              animate="center"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
            >
              <p>
                <strong>
                  <span>Войдите, чтобы делать покупки,</span>{' '}
                </strong>
                <span>
                  отслеживать заказы и пользоваться персональными скидками и
                  баллами. После входа вы сможете создать аккаунт юрлица.
                </span>
              </p>

              <AuthBtns
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                width="70"
                onClick={() => {
                  setformType('signin');
                  paginate(1);
                }}
              >
                Войти
              </AuthBtns>
              <span>или</span>
              <AuthBtns
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                width="70"
                onClick={() => {
                  setformType('signup-1');
                  paginate(1);
                }}
              >
                Зарегистрироваться
              </AuthBtns>
            </AuthContent>
          ) : formType == 'signin' ? (
            <AuthContent
              key={page}
              custom={direction}
              variants={variants.slider_auth}
              initial="enter"
              animate="center"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
            >
              <SignInComp />
            </AuthContent>
          ) : (
            <AuthContent
              key={page}
              custom={direction}
              variants={variants.slider_auth}
              initial="enter"
              animate="center"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
            >
              <SignUpComp />
            </AuthContent>
          )}
        </AnimatePresence>
      </AuthWrapper>
    </>
  );
};

const AuthWrapper = styled(motion.div)`
  width: 300px;
  height: 350px;
  position: absolute;
  top: 70px;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 10px ${color.box_shadow_btn};
  overflow: hidden;
`;

const AuthContent = styled(motion.div)`
  width: 85%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  p {
    text-align: center;
  }
  span {
    color: ${color.hover};
  }
`;

const AuthForm = styled(motion.form)`
  width: 100%;
  height: 285px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  h4 {
    width: 100%;
  }
  span {
    color: ${color.hover};
  }
`;

const AuthFeilds = styled(motion.input)`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 1px solid ${color.btnPrimary};
  border-radius: 10px;
`;

const AuthFeildsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 5px;
  label {
    align-self: flex-start;
  }
`;

const AuthDevider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const AuthBtns = styled(motion.button)`
  width: ${(p: props) => p.width}%;
  height: 40px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ArrowSpan = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: rotate(${(p: props) => p.rotate}deg);
`;

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  a {
    &:hover {
      color: ${color.hover};
    }
  }
`;

const ProfileDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Intro';
  }
  span {
    color: ${color.rating_empty};
  }
`;

export default AuthComp;
