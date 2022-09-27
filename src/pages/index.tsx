import ImageLink from '@/components/ImageLink'
import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Header } from '@/components';
import Loader from '@/components/Loader';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import { defaultTransition } from '@/components/Animation';

const framesHQ = 4
const framesWQ = 5
const totalOfFrames = framesHQ * framesWQ
const realTotalOfFrames = totalOfFrames - 1
const gridUtils = [600, 400, 600, 800, 600]
const photoH = 400
const photoW = 420
const galleryW = photoW * 5
const galleryH = photoH * 4

const Home = () => {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const [gridVisible, setGridVisible] = useState(true)
  const [screenH, setScreenH] = useState(0)
  const [screenW, setScreenW] = useState(0)
  const [imagesMap, setImageMap] = useState<any[]>([])
  const [initialScreen, setInitialScreen] = useState(true)
  const loaderControls = useAnimation()
  const animation = useAnimation()

  const bgColor = useMotionValue('black')
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(()=>{
    // set Screen Height and Width
    setScreenH(window.innerHeight)
    setScreenW(window.innerHeight)
    
    //fetchData
    fetchData()

    //Loader Animation
    setTimeout(()=>{
    loaderControls.start({
      opacity: 0,
      transition:{defaultTransition }})
    sequence()
    
   },2000)    
  },[])

  const fetchData = async()=>{
      try { 
        const url = `https://picsum.photos/v2/list?page=2&limit=${totalOfFrames}`
        axios.get(url)
        .then(res=>{
          setImageMap(res.data)
        })
      } catch (error) {
        console.log(error);
      } 
  }
  const sequence =async()=>{
    await animation.set((index)=>({
      y:gridUtils[index%5],
      scale:1.1
    }))
    await animation.start(()=>({
      y:0,
      transition:defaultTransition 
    }))
    bgColor.set("white")
    await animation.start({
      scale:1,
      transition:defaultTransition 
    })
    setGridVisible(false)
    setInitialScreen(false)
  }

  const handleGridParallax = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
      if(gridRef.current){
        const speed = -10 
        const{width, height} = gridRef.current.getBoundingClientRect();
        const offsetX = e.pageX - width * 0.5;
        const offsetY = e.pageY - height * 0.5;

        const newTransformX = (offsetX * speed) / 100;
        const newTransformY = (offsetY * speed) / 100;

        x.set(newTransformX)
        y.set(newTransformY)
      }
    }
    const xMotion = useSpring(x, {stiffness:400, damping:90})
    const yMotion = useSpring(y, {stiffness:400, damping:90})
  return (
    <>
    <Loader title='hall of frames' loaderControls={loaderControls} loader={initialScreen}/>
    <motion.div 
      style={{
        backgroundColor:bgColor,
        transition:'background-color 1.25s ease-in-out',
      }}
      className='relative overflow-auto visible  scrollbar-hide w-[100vw] h-[100vh]'>
      <Header view={gridVisible} toggleView={(value)=>setGridVisible(value)}/>
      {/* Grid */}
      {
        gridVisible && /* Grid Elements */ 
          <motion.div 
            onMouseMove={handleGridParallax}
            ref={gridRef}
            style={{
              x:xMotion,
              y:yMotion,
              top:(screenH/2 - galleryH/2),
              left:(screenW/2 - galleryW/2),
              width:galleryW,
              height:galleryH
            }}
            transition={defaultTransition}
            className={`flex items-center justify-center absolute visible mx-auto`}
            >
            <div className='grid grid-cols-grid5'>
            {imagesMap.map((image, index)=>(
              /*Element*/
                <motion.div 
                  key={image.id}
                  animate={animation}
                  custom={index}
                  style={{
                    width:photoW, 
                    height:photoH, 
                    position:'relative', 
                    paddingLeft:32, 
                    paddingRight:32, 
                    paddingTop:46, 
                    paddingBottom:46}}>
                  {/* thumbnail-wrapper */}
                  <ImageLink 
                    element={image.download_url} 
                    index={index}
                    slug={image.id}/>
                </motion.div>
            ))}    
            </div>        
          </motion.div>
      }
      {/* List */}
        {
          !gridVisible && <div className='overflow-auto h-[100vh] grid grid-cols-list20 place-items-center py-[10vh]'>
            {imagesMap.map((image, index)=>(
              /*Element*/
                <div
                  style={{
                    position:'relative',
                    marginLeft:screenW * 0.05,
                    marginRight:screenW * 0.05,
                    height: '70vh',
                    width: '70vw',
                  }} 
                  key={image.id}>
                  {/* thumbnail-wrapper */}
                  <ImageLink 
                    element={image.download_url} 
                    index={index}
                    slug={image.id}/>
                </div>
            ))}    
          </div>        
        }
    </motion.div>
    </>
  )
}


export default Home 