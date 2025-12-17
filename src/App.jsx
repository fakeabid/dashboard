import { useState, useEffect } from 'react'
import clsx from 'clsx'

import ClockWidget from '/src/components/ClockWidget'
import WeatherWidget from '/src/components/WeatherWidget'
import TodoWidget from '/src/components/TodoWidget'
import QuoteWidget from '/src/components/QuoteWidget'
import Greeting from './components/Greeting'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [theme, setTheme] = useState({
    themeName: '',
    index: 0
  })

  const themes = ['', 'nature', 'choco', 'sea', 'candy']

  function switchTheme() {
    setTheme((prevTheme) => (
      {
        themeName: themes[prevTheme.index < themes.length - 1 ? prevTheme.index + 1 : 0],
        index: prevTheme.index < themes.length - 1 ? prevTheme.index + 1 : 0
      }
    ))
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const root = document.getElementById("root")
    if (!root) return

    // remove old wallpaper classes
    root.classList.forEach(cls => {
      if (cls.startsWith("wallpaper-")) {
        root.classList.remove(cls)
      }
    })

    // add new one
    if (theme.themeName) {
      root.classList.add(`wallpaper-${theme.themeName}`)
    }
  }, [theme.themeName])

  const dashboardClass = clsx({
    'dashboard-grid': true,
    show: isVisible
  })

  const customizeBtnClass = clsx({
    'customize-wallpaper-btn': true,
    show: isVisible
  })

  const showClass = clsx({
    show: isVisible
  })

  return (
    <>
      <header className={showClass}>
        <h3>dashboard.app</h3>
      </header>

      <main>
        <Greeting greetingClassh1={showClass}/>

        <section className={dashboardClass}>
          <ClockWidget />
          <WeatherWidget />
          <TodoWidget />
          <QuoteWidget />
        </section>

        <button className={customizeBtnClass} onClick={switchTheme}>
          Switch Theme
        </button>
      </main>
    </>
  )
}

export default App
