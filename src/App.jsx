import Header from "./components/Headr.jsx";
import "./index.css";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: newValue,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChangeInput={handleChange} />
      {/* Results go hers, 그렇기에 계산을 여기서 수행 */}
      <Results input={userInput} />
      {/*userInput을 두 컴포넌트가 공유*/}
    </>
  );
}

export default App;
