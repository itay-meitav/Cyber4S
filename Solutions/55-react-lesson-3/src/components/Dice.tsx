function render(number: number, classes: string) {
  let cubes = [];
  for (let i = 0; i < number; i++) {
    cubes.push(
      <img
        className={classes}
        src={`https://www.calculator.net/img/dice${
          1 + Math.floor(Math.random() * 6)
        }.png`}
      />
    );
  }
  return <div className="cubes">{cubes}</div>;
}

interface Props {
  number: number;
  roll: boolean;
}

function Dice(props: Props) {
  return <>{render(props.number, props.roll ? "cube roll" : "cube")}</>;
}

export default Dice;
