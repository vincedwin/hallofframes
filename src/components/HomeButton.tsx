import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'react-feather'


type Props = {}

const HomeButton = (props: Props) => {
  return (
    <div className='z-50'>
        <Link href='/'><a>
            <ArrowLeft/>
        </a></Link>
    </div>
  )
}

export default HomeButton