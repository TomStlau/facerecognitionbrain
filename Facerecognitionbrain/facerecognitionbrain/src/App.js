import './App.css'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import React from 'react'
import Rank from './components/Rank/Rank'
import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

function App () {
  const particlesInit = useCallback(async engine => {
    console.log(engine)
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async container => {
    console.log(container)
  }, [])

  const [input, setInput] = React.useState('')

  const onButtonSubmit = () => {}

  const onInputChange = event => {
    setInput(event.target.value)
  }

  return (
    <div className='App'>
      <Particles
        id='tsparticles'
        init={particlesInit}
        loaded={particlesLoaded}
        style={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push'
              },
              onHover: {
                enable: true,
                mode: 'repulse'
              },
              resize: true
            },
            modes: {
              push: {
                quantity: 1
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: '#ffffff'
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce'
              },
              random: false,
              speed: 6,
              straight: false
            },
            number: {
              density: {
                enable: true,
                area: 800
              },
              value: 80
            },
            opacity: {
              value: 0.5
            },
            shape: {
              type: 'circle'
            },
            size: {
              value: { min: 1, max: 5 }
            },
            zIndex: {
              value: -10,
              opacityRate: 1,
              sizeRate: 1
            }
          },
          detectRetina: true
        }}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      {/* <FaceRecognition /> */}
    </div>
  )
}

export default App
