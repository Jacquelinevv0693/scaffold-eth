import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal-resizable-draggable'
import $ from 'jquery'
import shortid from 'shortid'
// IMPORT NEW LEVEL HERE
import { Intro, UnderflowLevel, CityLevel } from './levelContents'
import { connectController } from '../../controller'
import './styles.css'

const DialogContainer = ({ terminalVisible, currentLevel, dialogs }) => {
  // TODO: move this into redux
  const [uniqueWindowId, setUniqueWindowIdentifier] = useState(shortid.generate())

  const scrollToBottom = _elementSelector => {
    let elementSelector = `#terminalDialogContainer .flexible-modal .content`
    if (_elementSelector) elementSelector = _elementSelector
    const { scrollHeight } = $(elementSelector)[0]
    $(elementSelector).animate({ scrollTop: scrollHeight }, 'slow')
  }

  // TODO: move this into own file
  const getCurrentLevelView = () => {
    if (currentLevel === 'city') {
      return <CityLevel />
    }
    if (currentLevel === 'underflow') {
      return <UnderflowLevel />
    }
    // IMPORT NEW LEVEL HERE
    /*
    if (currentLevel === 'city') {
      return <CityLevel />
    }
    */

    // the initial level
    return <Intro />
  }

  const currentLevelView = getCurrentLevelView()

  useEffect(() => {
    scrollToBottom()
  }, [dialogs.currentDialog, dialogs.currentDialogIndex])

  return (
    <span id='terminalDialogContainer'>
      {terminalVisible && (
        <ReactModal
          className={uniqueWindowId}
          initWidth={359}
          initHeight={709}
          isOpen
          top={100}
          left={30}
        >
          <>
            <div
              className='background-image'
              style={{
                height: '100%',
                overflowY: 'scroll',
                background: 'url(./assets/trimmed/terminal_trimmed.png)',
                backgroundSize: '100% 100%'
              }}
            />
            <div
              className='content'
              style={{
                position: 'absolute',
                top: '33%',
                right: 0,
                height: '62%',
                marginLeft: '10%',
                marginRight: '20%',
                overflow: 'scroll'
              }}
            >
              {currentLevelView}
            </div>
          </>
        </ReactModal>
      )}
    </span>
  )
}

export default connectController(DialogContainer)