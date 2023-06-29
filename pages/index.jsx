import Head from 'next/head'
import { Inter } from 'next/font/google'
import Post from '@/components/Post'
import styles from '../styles/home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Post title='test1' URL='testURL' comment='comme' />
    <Post title='test2' URL='testURL2' comment='comme2' />
    </>
  )
}
