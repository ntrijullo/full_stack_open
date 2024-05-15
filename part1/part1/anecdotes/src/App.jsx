import { useState } from 'react'

const AnecdoteDay = ({anecdotes, index}) => (<div><h1>Anecdote of the day</h1>{anecdotes[index]}</div>)
const CountVotes = ({votes, index}) => (<div><p>has {votes[index]} votes</p></div>)
const Button = ({onClick, text}) => (<div><button onClick={onClick}>{text}</button></div>)
const AnecdoteMostVoted = ({anecdotes, mostVoted}) =>{
  if(mostVoted === null){
    return(<div></div>)
  }
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))
  const [mostVote, setMostVote] = useState(null)

  const setRandom = () =>{
    const max = anecdotes.length -1
    const min = 0
    let random;
    do {
      random = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (random === selected)
    setSelected(random)
  }

  const voteAnecdote = () =>{
    const copy = [...votes]
    copy[selected] +=1
    setVote(copy)
    setMostVote(copy.indexOf(Math.max(...copy)))
  }

  return (
    <div>
      <AnecdoteDay anecdotes={anecdotes} index={selected} />
      <CountVotes votes={votes} index={selected} />
      <Button onClick={voteAnecdote} text="Vote" />
      <Button onClick={setRandom} text="Next anecdote" />
      <AnecdoteMostVoted anecdotes={anecdotes} mostVoted={mostVote} />
    </div>
  )
}

export default App