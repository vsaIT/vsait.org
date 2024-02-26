type HamburgerMenuButtonProps = {
  isBurgerOpen: boolean;
  setIsBurgerOpen: (open: boolean) => void;
};

function HamburgerMenuButton({
  isBurgerOpen,
  setIsBurgerOpen,
}: HamburgerMenuButtonProps): JSX.Element {
  return (
    <button
      className={`hamburger hamburger--collapse fixed right-6 top-6 z-30 h-12 w-12 rounded-full
          ${isBurgerOpen ? 'is-active' : ''}
          `}
      type='button'
      onClick={() => setIsBurgerOpen(!isBurgerOpen)}
    >
      <span className='hamburger-box'>
        <span className='hamburger-inner'></span>
      </span>
    </button>
  );
}

export default HamburgerMenuButton;
