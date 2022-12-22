import AppLayout from '../components/layouts/AppLayout'
import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import axios from '../lib/axios'
import { useState } from 'react'
import Modal from '../components/Modal'

interface Data {
  name?: string
  phone?: string
  email?: string
  message: string
  adults?: number
  children?: number
  created_at?: Date
}

export const getServerSideProps: GetServerSideProps<{
  data: Array<Data>
}> = async () => {
  const res = await axios.get('/api/confirmation')
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
  const [open, setOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const handleModal = (message: string) => {
    setModalMessage(message)
    setOpen(true)
  }

  return (
    <>
      <Modal
        title="Mensagem"
        toggle={open}
        action={() => setOpen(false)}
        message={modalMessage}
        hasCancelButton={false}
      />
      <AppLayout
        header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Lista de Confirmação
          </h2>
        }
      >
        <Head>
          <title>Wedding ADM - Lista de Confirmação</title>
        </Head>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <div className="overflow-x-auto">
                  <table className="table table-compact w-full table-auto">
                    <thead className="border-b">
                      <tr>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Nome Completo
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Telefone
                        </th>
                        <th className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200text-center">
                          Adultos
                        </th>
                        <th className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200text-center">
                          Crianças
                        </th>
                        <th className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200text-center">
                          Observação
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((confirmation, index) => {
                        return (
                          <tr key={index}>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                              {confirmation.name}
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                              {confirmation.email}
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                              {confirmation.phone}
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                              {confirmation.adults}
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                              {confirmation.children}
                            </td>
                            <td className="text-center px-4 py-2">
                              <a
                                href="#"
                                onClick={() =>
                                  handleModal(confirmation.message)
                                }
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Ver
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  )
}
