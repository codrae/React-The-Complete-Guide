import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    // 함수 처음 호출 시 기본 값 기준으로 밑에서 계속 사용됨
    // setIsEditing(!isEditing); 이전 값 기반 변경 시 이렇게 하면 안됨!
    // setIsEditing(!isEditing); isEditing 값 초기와 동일
    // 상태 업데이트 함수로 새로 내보내기 (가장 최신 상태의 값을 가져옴)
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    console.log(event);
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className={"player"}>
        {isEditing ? (
          <span>
            <input
              type={"text"}
              required
              value={playerName}
              onChange={handleChange}
            />
          </span>
        ) : (
          <span className={"player-name"}>{playerName}</span>
        )}
        <span className={"player-symbol"}>{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
