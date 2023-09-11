import React from 'react'

const Signin = ({ onRouteChange, loadUser }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onEmailChange = event => {
    setEmail(event.target.value)
  }
  const onPasswordChange = event => {
    setPassword(event.target.value)
  }

  // check if the user exists in the database
  // if so, then route to home
  // else, route to register
  const onSubmitSignIn = async () => {
    const requestBody = {
      email,
      password
    }

    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      const user = await response.json()

      if (user.id) {
        onRouteChange('home')
        loadUser(user)
      } else {
        onRouteChange('register')
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error('An error occurred:', error)
    }
  }

  return (
    <article className='back-sign br3 ba dark-gray z-999 relative b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
      <main className='pa4 black-80 flex justify-center'>
        <div className='measure '>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f1 fw6 ph0 mh0 center'>Sign In</legend>
            <div className='mt3'>
              <label
                className='db fw6 lh-copy f6'
                htmlFor='email-address'
              ></label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='email'
                name='email'
                placeholder='Email'
                id='email-address'
                onChange={onEmailChange}
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'></label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                placeholder='Password'
                name='password'
                id='password'
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              onClick={() => onSubmitSignIn()}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value='Sign in'
            />
          </div>
          <div className='lh-copy mt3'>
            <p
              onClick={() => onRouteChange('register')}
              className='f6 link dim black db pointer'
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  )
}

export default Signin
