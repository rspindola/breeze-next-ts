import AppLayout from '../components/layouts/AppLayout'
import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import axios from '../lib/axios'

interface Data {
  name: string
  email: string
  text: string
  created_at: string
}

export const getServerSideProps: GetServerSideProps<{
  data: Array<Data>
}> = async () => {
  const res = await axios.get('/api/message')
  const {
    data: { data },
  } = res

  return {
    props: {
      data,
    },
  }
}

export default function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <AppLayout
        header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Lista de Recados
          </h2>
        }
      >
        <Head>
          <title>Wedding ADM - Lista de Recados</title>
        </Head>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <div className="overflow-x-auto">
                  {data.map((message, index) => {
                    return (
                      <div key={index} className="chat chat-start">
                        <div className="chat-image avatar placeholder">
                          <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                            <span>{message.name.substring(0, 1)}</span>
                          </div>
                        </div>
                        <div className="chat-header">
                          {message.name}
                          <time className="ml-4 text-xs opacity-50">
                            {message.created_at}
                          </time>
                        </div>
                        <div className="chat-bubble">{message.text}</div>
                        <div className="chat-footer opacity-50">
                          {message.email}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  )
}
