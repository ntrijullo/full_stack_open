import { useState } from "react"

const Button = ({handleClick, text}) => (<div><button onClick={handleClick}>{text}</button></div>)
const StatisticLine = ({value, text}) => (<><tr><td>{text}</td><td>{value}</td></tr></>)
const Statistics = ({statistics}) =>{
  if(statistics.all != 0){
    return(
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={statistics.good} />
            <StatisticLine text="neutral" value={statistics.neutral} />
            <StatisticLine text="bad" value={statistics.bad} />
            <StatisticLine text="all" value={statistics.all} />
            <StatisticLine text="average" value={statistics.all == 0?0:(statistics.good - statistics.bad)/statistics.all} />
            <StatisticLine text="positive" value={statistics.all == 0?0:(statistics.good/statistics.all)+'%'} />
          </tbody>
        </table>
      </div>
    )
  }
  return(
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const App = () =>{
  const [statistics, setStatistics] = useState({
    good:0,
    neutral:0,
    bad:0,
    all:0
  })
  
  const handleGoodClick = () =>{
    setStatistics({
      ...statistics,
      good:statistics.good+1,
      all:statistics.all+1,
    })
  }

  const handleNeutralClick = () =>{
    setStatistics({
      ...statistics,
      neutral:statistics.neutral+1,
      all:statistics.all+1,
    })
  }

  const handleBadClick = () =>{
    setStatistics({
      ...statistics,
      bad:statistics.bad+1,
      all:statistics.all+1,
    })
  }

  return(
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <Statistics statistics={statistics}/>
    </div>
  )
}

export default App