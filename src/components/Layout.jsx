import React from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children, title, description, keywords, author}) => {
  return (
    <>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name='description' content='description'/>
        <meta name='keywords' content='keywords'/>
        <meta name='author' content='author'/>

        <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{height: "auto"}}>
        {children}
      </main>
      <Footer/>
    </>
  )
}

Layout.defaultProps = {
    title: "Blog",
    description: "blog_with_authntication",
    keywords: "react, js, node, mongodb",
    author: "Mr.X"
}

export default Layout
