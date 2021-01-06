const mqlMedia = window.matchMedia('(orientation: portrait)');

function onMatchMediaChange(mql = mqlMedia) {
  if (mql.matches) {
    // 竖屏
    return 'portrait';
  } else {
    // 横屏
    return 'horizontal';
  }
}

const isPCMode = (mode) => mode === 'pc';
const getUIMode = (mode = '', mql) => {
  if (mode) return mode;
  if (!('onorientationchange' in window)) return 'pc';
  let status = onMatchMediaChange(mql);
  let width =
    status === 'portrait'
      ? Math.min(window.innerWidth, window.innerHeight)
      : Math.max(window.innerWidth, window.innerHeight);
  if (width > 1040) return 'pc';
  return 'mobile';
};

export function withUIMode(Comp, options = {}) {
  return class WithUIRem extends React.Component {
    constructor(props) {
      super(props);
      let mode = getUIMode();
      let isPCMode = isPCMode(mode);
      this.state = { uiMode: mode, isPCMode: isPCMode };
    }
    conponentDidMount() {
      mqlMedia.addEventListener(this.changeUIMode);
    }
    componentWillUnmount() {
      mqlMedia.removeEventListener(this.changeUIMode);
    }
    changeUIMode = (mql) => {
      let mode = getUIMode('', mql);
      if (mode !== this.state.uiMode) {
        this.setState({ uiMode: mode, isPCMode: isPCMode(mode) });
      }
    };
    render() {
      return <Comp {...this.state} {...this.props} />;
    }
  };
}
export default (options) => {
  return (component) => withUIMode(component, options);
};
