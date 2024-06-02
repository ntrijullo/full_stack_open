import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"

const App = () =>{
  const [persons, setPersons] = useState([])
  const [resultSearch, setResultSearch] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () =>{
    personService
      .getAll()
      .then(response =>{
        setPersons(response)
      })
      .catch(error =>{
        console.log(error)
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
    const existPerson = persons.find(duplicateName)
    if( existPerson === undefined){
      const newPersonObject = {
        name:newName, number:newNumber
      }
      personService
        .create(newPersonObject)
        .then(response =>{
          setPersons(persons.concat(response))
        })
        .catch(error =>{
          console.log(error)
        })
    }else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const changePerson = {...existPerson, number:newNumber}
        personService
          .update(existPerson.id, changePerson)
          .then(response =>{
            console.log(response)
            setPersons(persons.map(person => person.id !== existPerson.id ? person:response))
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const remove = (id) =>{
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error =>{
        console.log(error)
      })
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
      <Persons persons={personsToShow} remove={remove}/>
    </div>
  )
}

export default App