import React from 'react'
import {Columns, Grid} from 'react-feather'
type Props = {
    toggleView:(view:boolean)=>void
    view:boolean
}

const Header = ({toggleView, view}: Props) => {
  return (
    <header className='fixed right-5 top-5 z-50 group'>
        <button 
            className='cursor-pointer p-2 bg-gray-50 grid place-items-center
            ease-in-out duration-200 group-hover:bg-black/30 '
            onClick={()=>toggleView(!view)}>
            {view
                ?<Columns className='group-hover:fill-black/30 group-hover:stroke-gray-100 stroke-1'/>
                :<Grid className='group-hover:fill-black/30 group-hover:stroke-gray-100 stroke-1'/>
            }
        </button>
    </header>
  )
}

export default Header