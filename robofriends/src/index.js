import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Card from './Card'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Card id={1} name='John Doe' email='john.doe@gmail.com' />
    <Card id={2} name='Jane Doe' email='jane.doe@gmail.com' />
    <Card id={3} name='Joe Doe' email='joe.doe@gmail.com' />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
