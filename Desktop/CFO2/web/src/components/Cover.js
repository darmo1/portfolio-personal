import React from 'react'

const Cover = (props) => {
    return (
        <section className="presentation">
        <div className="presentation__info container flex-column align-center absolute">
                {props.children}
        </div>
      </section>
    )
}

export default Cover
