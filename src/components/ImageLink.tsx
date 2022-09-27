import React from 'react'
import {motion} from 'framer-motion'
import { defaultTransition } from './Animation'
import { useRouter } from 'next/router'
import Image from 'next/image'

type Props = {
    element:string
    index:number
    slug:string
}

const ImageLink = ({element, index, slug}: Props) => {
  const router = useRouter()
  const navigateTo = ()=>{
    const link = `/project/${slug}`
    router.push(link)
  }
  return (
    <motion.div
        onClick={navigateTo}
        layoutId={`container-${index}`}
        className='h-full w-full relative cursor-pointer'
        transition={defaultTransition}>
          <Image src={element} alt='1' layout='fill' objectFit='contain' priority/>
    </motion.div>
  )
}

export default ImageLink