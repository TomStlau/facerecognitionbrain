import React from 'react'
import CardList from './CardList'
import { robots } from './robots'
import SearchBox from './SearchBox'


const App = () => {
    const [searchfield, setSearchfield] = React.useState('')
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
