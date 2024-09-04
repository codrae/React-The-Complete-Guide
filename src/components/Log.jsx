export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row} ${turn.square.col}`}>
          {/*"js 문법 : 백틱을 통해 동적으로 문자열 생성 "*/}
          {turn.player}selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
