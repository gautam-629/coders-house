import React from 'react'
import style from './Button.module.css'
const Button = ({text,Click}) => {
  return (
    <button onClick={Click} className={style.button}>
    <span>{text}</span>
    <img className={style.arrow} src="/images/arrow-forward.png" alt="arrow" />
  </button>
  )
}

export default Button