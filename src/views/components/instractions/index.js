// ** Reactstrap Imports
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"

// ** Third Party Components
import { ShepherdTour, ShepherdTourContext } from "react-shepherd"

// ** Styles
import "shepherd.js/dist/css/shepherd.css"
import "@styles/react/libs/shepherd-tour/shepherd-tour.scss"
import allSteps from "./steps"

const backBtnClass = "btn btn-sm btn-outline-primary",
  nextBtnClass = "btn btn-sm btn-primary btn-next"

let instance = null
const Content = () => {
  const tour = useContext(ShepherdTourContext)
  instance = tour

  const { roadMap } = useSelector((state) => state.global)

  useEffect(() => {
    if (roadMap) {
      tour.start()
    }
  }, [roadMap])
}

const Instructions = ({ name }) => {
  const [steps, setSteps] = useState([])

  useEffect(() => {
    setSteps(
      allSteps?.[name]?.map((item) => {
        return {
          id: item?.tag,
          text: item?.text,
          attachTo: { element: `#${item?.tag}`, on: item?.position ?? 'top' },

          buttons: item?.button?.map((btn) => {
            return {
              text: btn === 1 ? "Skip" : btn === 2 ? "Back" : btn === 3 ? "Next" : "Finish",
              classes: btn === 1 || btn === 2 ? backBtnClass : nextBtnClass,
              action: btn === 1 || btn === 4 ? () => instance.cancel() : btn === 2 ? () => instance.back() : () => instance.next()
            }
          })
        }
      })
    )
  }, [])

  return (
    <ShepherdTour
      steps={steps}
      tourOptions={{
        useModalOverlay: true
      }}
    >
      <Content />
    </ShepherdTour>
  )
}
export default Instructions
