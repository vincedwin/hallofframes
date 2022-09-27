import { defaultTransition, SingleProjectPageTransition } from '@/components/Animation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import HomeButton from '@/components/HomeButton'

type Props = {
    id:string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = ctx?.params?.id
    return {
      props: {
        id
      }
    }
  }

const SingleProject = ({id}: Props) => {
  const [screenH, setScreenH] = useState(0)
  const [screenW, setScreenW] = useState(0)
  useEffect(()=>{
    setScreenH(window.innerHeight)
    setScreenW(window.innerHeight)
  })
  return (
    <div className=''>
        <div className='absolute top-5 left-5 z-50'>
            <HomeButton/>
        </div>
        <div className='flex items-center justify-center'
          style={{width:screenW, height:screenH}}>
            <motion.div
                initial='initial'
                animate='animate'
                transition={defaultTransition}
                variants={SingleProjectPageTransition}
                className='aspect-video w-[1200px] object-cover relative'>
              <Image src={`https://picsum.photos/id/${id}/1200`} alt='1' layout='fill' objectFit='contain' priority/>
            </motion.div>
        </div>
    </div>
  )
}

export default SingleProject