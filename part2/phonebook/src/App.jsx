import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios"

const App = () =>{
  const [persons, setPersons] = useState([])
  const [resultSearch, setResultSearch] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () =>{
    axios 
      .get('http://localhost:3001/persons')
      .then(response =>{
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const setPerson = (event) => setNewName(event.target.value)
  const setNumber = (event) => setNewNumber(event.target.value)
  const duplicateName = (names) => names.name === newName
  const personsToShow = showAll ? persons : resultSearch 

  const findPerson = (event) =>{
    let inputSearch = event.target.value
    setSearch(inputSearch)
    setResultSearch(persons.filter(person => person.name.toLowerCase().includes(inputSearch.toLowerCase())))
    if(inputSearch.length){
      setShowAll(false)
    }else{
      setShowAll(true)
      setResultSearch([])
    }
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find(duplicateName) === undefined){
      setPersons(persons.concat({name:newName, number:newNumber}))
      setNewName('')
      setNewNumber('')
    }else{
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    }

  }


  return(
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={findPerson} />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        setName={setPerson}
        setPerson={setNumber}
      />  

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App