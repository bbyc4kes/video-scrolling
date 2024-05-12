'use client'

import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { scrollYProgress } = useScroll({
    target: canvasRef,
    offset: ['center end', 'start start'],
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
    [frames]
  )

  useMotionValueEvent(currentIdx, 'change', (latest) => {
    render(Number(latest.toFixed()))
  })

  useEffect(() => {
    render(1)
  }, [render])

  return (
    <main className="flex h-[10000px] w-full justify-center items-center bg-black p-24">
      <div className="h-[3000px]"></div>
      <canvas ref={canvasRef} width={1000} height={1000}></canvas>
    </main>
  )
}
