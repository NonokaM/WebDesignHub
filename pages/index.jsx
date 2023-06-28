import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Post from '@/components/Post'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Post title='test1' URL='testURL' comment='comme' />
    <Post title='test2' URL='testURL2' comment='comme2' />
    </>
  )
}
