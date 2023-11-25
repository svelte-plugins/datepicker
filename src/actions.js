export const clickOutside = (node, config = {}) => {
  const options = {
    include: [],
    onClickOutside: () => {},
    ...config
  };

  const detect = ({ target }) => {
    if (!node.contains(target) || options.include.some((i) => target.isSameNode(i))) {
      options.onClickOutside();
    }
  };

  document.addEventListener('click', detect, { passive: true, capture: true });

  return {
    destroy() {
      document.removeEventListener('click', detect);
    }
  };
};
