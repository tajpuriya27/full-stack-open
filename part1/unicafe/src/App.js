import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  // defining function
  const clickGood = () => {
    const updateGood = good + 1;
    setGood(updateGood);
    setAll(updateGood + neutral + bad);
  };
  const clickNeutal = () => {
    const updateNeutral = neutral + 1;
    setNeutral(updateNeutral);
    setAll(good + updateNeutral + bad);
  };
  const clickBad = () => {
    const updateBad = bad + 1;
    setBad(updateBad);
    setAll(good + neutral + updateBad);
  };

  const averageFun = () => {
    return all / 3;
  };
  const positiveFun = () => {
    if (all) {
      return (good / all) * 100;
    }
    return all;
  };
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={clickGood}>good</button>
      <button onClick={clickNeutal}>neutral</button>
      <button onClick={clickBad}>bad</button>
      <h3>statistics</h3>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {averageFun()}</p>
      <p>postive {positiveFun()} % </p>
    </div>
  );
};

export default App;
