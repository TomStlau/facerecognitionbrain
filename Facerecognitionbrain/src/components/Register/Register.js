import React from 'react'

const Register = ({ onRouteChange, loadUser }) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onNameChange = React.useCallback(event => {
    setName(event.target.value)
  }, [])

  const onEmailChange = React.useCallback(event => {
    setEmail(event.target.value)
  }, [])

  const onPasswordChange = React.useCallback(event => {
    setPassword(event.target.value)
  }, [])

  // Rest of the component code...

  const onRegisterSubmit = async () => {
    if (!name || !email || !password) {
      alert('Please enter all fields')
      return
    }
    const requestBody = JSON.stringify({
      name,
      email,
      password
    })

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody
      })

      const user = await response.json()
      if (user.id) {
        loadUser(user)
        onRouteChange('home')
      }
    } catch (error) {
      // Handle error
    }
  }

  return (
    <article className='back-sign relative br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
      <main className='pa4 black-80 '>
        <div className='measure '>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f2 fw6 ph0 mh0 '>Register</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='name'>
                Name
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                type='text'
                name='name'
                id='name'
                onChange={onNameChange}
              />
            </div>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                type='email'
                name='email-address'
                id='email-address'
                onChange={onEmailChange}
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password '>
                Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black '
                type='password'
                name='password'
                id='password'
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              onClick={() => onRegisterSubmit()}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-black '
              type='submit'
              value='Register'
            />
          </div>
          <div className='lh-copy mt3'>
            <p
              onClick={() => onRouteChange('signin')}
              className='f6 link dim black db pointer'
            >
              Already have an account?
            </p>
          </div>
        </div>
      </main>
    </article>
  )
}

export default Register
