import React from 'react'
import {AnimationControls, motion} from 'framer-motion'
import { defaultTransition, LoaderTransition } from './Animation'
type Props = {
    title:string
    loaderControls: AnimationControls
    loader:boolean
}

const Loader = ({title, loaderControls, loader}: Props) => {
  return (
    <motion.div className={`absolute inset-0 bg-black text-white text-2xl flex uppercase place-items-center font-bold justify-center ${loader?"z-30":"z-0"}`}
        animate={loaderControls}>
        <motion.h1
            variants={LoaderTransition}
            initial='initial'
            animate='animate'
            transition={defaultTransition}
            >
            {title}
        </motion.h1>
    </motion.div>
  )
}

export default Loader