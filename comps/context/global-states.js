import React, { createContext, useContext, useState, useEffect, useRef } from "react"
//Libraries
import * as THREE from "three";

const GlobalContext = createContext()

export const GlobalStatesProvider = ({ children }) => {

  const [theme, setTheme] = useState("blue")
  const [GLColor, setGLColor] = useState(new THREE.Color("#7993b6"))
  const [color, setColor] = useState("#7993b6")
  const [isTouch, setIsTouch] = useState(false)
  const [wrapperOffsetMenu, setWrapperOffsetMenu] = useState({})
  const [wrapperOffsetContent, setWrapperOffsetContent] = useState({})
  const [wrapperOffsetPalette, setWrapperOffsetPalette] = useState({})
  const [isPageLoading, setIsPageLoading] = useState()
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isEntering, setIsEntering] = useState(false)
  const [isPageReady, setIsPageReady] = useState(false)

  useEffect(() => {
    detectTouch()
    getWrapperOffset()
    window.addEventListener("resize", () => {
      getWrapperOffset()
    })
    return () => {
      window.removeEventListener("resize", () => {
        getWrapperOffset()
      })
    }
  }, [])

  useEffect(() => {
    toggleThemeColor()
  }, [theme])

  const detectTouch = () => {
    if ('ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
      setIsTouch(true)
    } else {
      setIsTouch(false)
    }
  }

  const toggleThemeColor = () => {
    if (theme === "blue") {
      document.body.classList.add("blue-theme")
      document.body.classList.remove("orange-theme")
      document.body.classList.remove("green-theme")
      document.body.classList.remove("light-green-theme")
      document.body.classList.remove("grey-theme")
      document.body.classList.remove("black-theme")
      setGLColor(new THREE.Color("#7993b6"))
      setColor("#7993b6")
    } else if (theme === "orange") {
      document.body.classList.remove("blue-theme")
      document.body.classList.add("orange-theme")
      document.body.classList.remove("green-theme")
      document.body.classList.remove("light-green-theme")
      document.body.classList.remove("grey-theme")
      document.body.classList.remove("black-theme")
      setGLColor(new THREE.Color("#bc8c39"))
      setColor("#bc8c39")
    } else if (theme === "green") {
      document.body.classList.remove("blue-theme")
      document.body.classList.remove("orange-theme")
      document.body.classList.add("green-theme")
      document.body.classList.remove("light-green-theme")
      document.body.classList.remove("grey-theme")
      document.body.classList.remove("black-theme")
      setGLColor(new THREE.Color("#52a47e"))
      setColor("#52a47e")
    } else if (theme === "light-green") {
      document.body.classList.remove("blue-theme")
      document.body.classList.remove("orange-theme")
      document.body.classList.remove("green-theme")
      document.body.classList.add("light-green-theme")
      document.body.classList.remove("grey-theme")
      document.body.classList.remove("black-theme")
      setGLColor(new THREE.Color("#8c9a65"))
      setColor("#8c9a65")
    } else if (theme === "grey") {
      document.body.classList.remove("blue-theme")
      document.body.classList.remove("orange-theme")
      document.body.classList.remove("green-theme")
      document.body.classList.remove("light-green-theme")
      document.body.classList.add("grey-theme")
      document.body.classList.remove("black-theme")
      setGLColor(new THREE.Color("#a7b6b0"))
      setColor("#a7b6b0")
    } else if (theme === "black") {
      document.body.classList.remove("blue-theme")
      document.body.classList.remove("orange-theme")
      document.body.classList.remove("green-theme")
      document.body.classList.remove("light-green-theme")
      document.body.classList.remove("grey-theme")
      document.body.classList.add("black-theme")
      setGLColor(new THREE.Color("#2a2927"))
      setColor("#2a2927")
    }
  }

  const getWrapperOffset = () => {

    if (window.innerWidth > 768) {
      setWrapperOffsetMenu({
        x: 20,
        y: 20
      })
      setWrapperOffsetContent({
        x: 20,
        y: 130
      })
      setWrapperOffsetPalette({
        x: 20,
        y: 20
      })
    } else {
      setWrapperOffsetMenu({
        x: 15,
        y: 25
      })
      setWrapperOffsetContent({
        x: 15,
        y: 25
      })
      setWrapperOffsetPalette({
        x: 5,
        y: 5
      })
    }

  }

  const getParams = ({ els = [], offset = {} }) => {
    if (!isTouch) {
      const elements = [].concat(els || []);
      if (els) {
        const paramsList = elements.map((element) => {
          return element.getBoundingClientRect()
        })
        paramsList.map((params) => {
          params.centerX = params.x + (params.width / 2) - offset.x
          params.centerY = params.y + (params.height / 2) - offset.y
        })
        return paramsList
      }
    }
  }

  const getGLSize = (imageWrapper, GLWrapper) => {
    if (imageWrapper) {
      const imgWrapperWidth = imageWrapper.clientWidth
      const imgWrapperHeight = imageWrapper.clientHeight

      GLWrapper.style.width = `${imgWrapperWidth * 1.8}px`
      GLWrapper.style.height = `${imgWrapperHeight * 1.8}px`
    }
  }


  return (
    <GlobalContext.Provider value={{ theme, setTheme, GLColor, setGLColor, color, setColor, isTouch, setIsTouch, wrapperOffsetMenu, wrapperOffsetContent, wrapperOffsetPalette, getParams, getGLSize, isPageLoading, setIsPageLoading, setIsPageLoaded, isPageLoaded, setIsExiting, isExiting, setIsEntering, isEntering, setIsPageReady , isPageReady}}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalStates = () => {
  return useContext(GlobalContext)
}