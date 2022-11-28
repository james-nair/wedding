type LoaderProps = {
  show?: boolean;
};

const Loader = (props: LoaderProps) => {
  return props.show ? <div className="loader"></div> : null;
};

export default Loader;
