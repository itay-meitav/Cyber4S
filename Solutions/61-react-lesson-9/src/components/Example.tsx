interface IProp extends React.PropsWithChildren {
  name: string;
}
const Example = (props: IProp): JSX.Element => {
  return <div>{props.children}</div>;
};

function Example2(props: IProp): JSX.Element {
  return <div>{props.children}</div>;
}
