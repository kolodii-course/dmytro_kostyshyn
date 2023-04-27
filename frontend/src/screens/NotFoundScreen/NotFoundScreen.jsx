import React from 'react'
import { useLocation } from "react-router-dom";
import './NotFoundScreen.scss'

export default function NotFoundScreen() {
  return (
    <div className='not-found-container'>
        <h1>404 | Not found page</h1>
        <h2>{useLocation().pathname}</h2>
    </div>
  )
}
