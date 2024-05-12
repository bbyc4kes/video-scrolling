'use client'

import { forwardRef } from 'react'
import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useCallback, useEffect, useMemo } from 'react'

const VideoScrolling = forwardRef(function VideoScrolling(props, ref) {
  const canvasRef = ref as React.RefObject<HTMLCanvasElement>

  const { scrollYProgress } = useScroll({
    target: canvasRef,
    offset: ['start end', 'center start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log(latest)
  })

  const frames = useMemo(() => {
    const loadedFrames: HTMLImageElement[] = []

    for (let i = 1; i <= 86; i++) {
      const img = new Image()
      img.src = `images/${i}.webp`

      loadedFrames.push(img)
    }

    return loadedFrames
  }, [])

  const currentIdx = useTransform(scrollYProgress, [0, 1], [1, 86])

  const render = useCallback(
    (index: number) => {
      if (frames[index - 1]) {
        canvasRef.current?.getContext('2d')?.drawImage(frames[index - 1], 0, 0)
      }
    },
    [frames, canvasRef]
  )

  useMotionValueEvent(currentIdx, 'change', (latest) => {
    render(Number(latest.toFixed()))
  })

  useEffect(() => {
    render(1)
  }, [render])
  return <canvas ref={canvasRef} width={1000} height={1000}></canvas>
})

export default VideoScrolling
