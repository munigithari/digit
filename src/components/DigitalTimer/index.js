// Write your code here
import {Component} from 'react'

import './index.css'

const intialState = {isTimerRunning: false, timerEclipsedInSeconds: 0, timweInMinutes: 25}

class DigitalTimer extends Component {
  state = intialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseInMinutes = () => {
    const {timweInMinutes} = this.state

    if (timweInMinutes > 1) {
      this.setState(prevState => ({
        timweInMinutes: prevState.timweInMinutes - 1,
      }))
    }
  }

  onIncreseInMinutes = () => {
    const {timweInMinutes} = this.state
    if (timweInMinutes > 1) {
      this.setState(prevState => ({
        timweInMinutes: prevState.timweInMinutes + 1,
      }))
    }
  }

  renderingMethod = () => {
    const {timerEclipsedInSeconds} = this.state
    const result = timerEclipsedInSeconds > 0

    return (
      <div className="card-container">
        <p className="paragraph">Set Timer limit</p>
        <div className="container22">
          <button
            className="button1"
            type="button"
            disabled={result}
            onClick={this.onDecreaseInMinutes}
          >
            -
          </button>
          <button type="button" className="button1">
            <p className = "paragraph">25</p>
          </button>
          <button
            className="button1"
            type="button"
            disabled={result}
            onClick={this.onIncreseInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState(intialState)
  }

  incrementInSeconds = () => {
    const {timweInMinutes, timerEclipsedInSeconds} = this.state
    const isTimerComplted = timerEclipsedInSeconds === timweInMinutes * 60

    if (isTimerComplted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerEclipsedInSeconds: prevState.timerEclipsedInSeconds + 1,
      }))
    }
  }

  onStartOrPause = () => {
    const {isTimerRunning, timerEclipsedInSeconds, timweInMinutes} = this.state
    const isTimerComplted = timerEclipsedInSeconds === timweInMinutes * 60

    if (isTimerComplted) {
      this.setState({timerEclipsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const text = isTimerRunning ? 'pause icon' : 'play icon'
    
    return (
      <div className="list-container">
        <button className="button2" type="button" onClick={this.onStartOrPause}>
          <img src={imageUrl} alt={text} className="image4" />
          <p className="heading2">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button className="button2" type="button" onClick={this.onReset}>
          <img
            src= "https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="image2"
          />
          <p className="heading2">Reset</p>
        </button>
      </div>
    )
  }

  getInFormet = () => {
    const {timweInMinutes, timerEclipsedInSeconds} = this.state
    const remainingSeconds = timweInMinutes * 60 - timerEclipsedInSeconds
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)

    const stringfiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringfiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringfiedMinutes} : ${stringfiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="middle-container">
          <div className="container1">
            <div className="container111">
              <h1 className="heading3">{this.getInFormet()}</h1>
              <p className="heading4">{labelText}</p>
            </div>
          </div>
          <div className="container2">
            {this.renderingMethod()}
            {this.renderTimerController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
