import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import "regenerator-runtime/runtime"
import withLang from '../components/withLang'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default withLang(App);