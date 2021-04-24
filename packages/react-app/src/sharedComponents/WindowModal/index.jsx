import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal-resizable-draggable'
import shortid from 'shortid'
import $ from 'jquery'
import './styles.css'

export default function WindowModal({
  initWidth,
  initHeight,
  initTop,
  initLeft,
  onFocus,
  onRequestClose,
  isOpen,
  title,
  containerStyle,
  children
}) {
  const [uniqueWindowId, setUniqueWindowIdentifier] = useState(shortid.generate())
  const [minimized, setMinimized] = useState(false)

  const menubarHeight = 28

  useEffect(() => {
    if (minimized) {
      $(`.${uniqueWindowId}`).height(menubarHeight)
    } else {
      $(`.${uniqueWindowId}`).height(initHeight)
    }
  }, [minimized])

  const buttonStyles = {
    float: 'right',
    height: 27,
    cursor: 'pointer'
  }

  return (
    <ReactModal
      initWidth={initWidth}
      initHeight={initHeight}
      onFocus={onFocus}
      className={uniqueWindowId}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      top={initTop}
      left={initLeft}
    >
      <div
        className='flexible-modal-drag-area'
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          background: '#fff',
          width: '100%',
          borderBottom: 'solid 4px #000',
          cursor: 'move'
        }}
      >
        <div style={{ float: 'left', width: '100%', cursor: 'move' }}>
          <div
            style={{
              fontSize: 12,
              color: '#000'
            }}
          >
            <div
              style={{
                float: 'left',
                padding: 5,
                paddingLeft: 7
              }}
            >
              {title}
            </div>
            <button
              type='button'
              style={{ ...buttonStyles }}
              onClick={() => console.log('click close')}
              className='close'
            >
              X
            </button>
            <button
              type='button'
              style={{ ...buttonStyles }}
              onClick={() => {
                console.log('click minimize')
                setMinimized(!minimized)
              }}
              className='minimize'
            >
              _
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          height: 'calc(100% - 30px)',
          overflowY: 'scroll',
          marginTop: 30,
          ...containerStyle
        }}
      >
        {children}
      </div>
    </ReactModal>
  )
}