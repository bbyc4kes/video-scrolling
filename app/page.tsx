'use client'

import { useRef } from 'react'
import VideoScrolling from './components/video-scrolling'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <main className="flex h-[6000px] w-full justify-center items-center bg-black">
      <div className="h-[3000px]" />
      <VideoScrolling ref={canvasRef} />
    </main>
  )
}
