import React from 'react'
import CardList from './CardList'
import SearchBox from './SearchBox'
import './App.css'


const App = () => {
    
    
    const [searchfield, setSearchfield] = React.useState('')
    const [robots, setRobots] = React.useState([])
    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {setRobots(users)})
    }, [])
    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
  return (
    <div className='tc'>
        <h1>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <CardList robots={filteredRobots} />
    </div>
  )
}

export default App
