import React from 'react'

const Rank = ({ user }) => {
  const capitalizedUserName =
    user.name.charAt(0).toUpperCase() + user.name.slice(1)
  return (
    <div>
      <div className='white f3'>{`${capitalizedUserName}, your current entry count is...`}</div>
      <div className='white f1'>{user.entries}</div>
    </div>
  )
}

export default Rank
