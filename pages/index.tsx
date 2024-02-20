import Header from "@/components/Header"
import Form from "@/components/Form"
import PostFeed from "@/components/PostFeed"

export default function Home() {
  return (
    <>
      <Header label='首頁'/>
      <Form placeholder="想分享點事情嗎"/>
      <PostFeed/>
    </>
  )
}
