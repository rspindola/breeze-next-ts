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
                        <th>Nome Completo</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th className="text-right">Adultos</th>
                        <th className="text-right">Crianças</th>
                        <th className="text-center">Observação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((confirmation, index) => {
                        return (
                          <tr key={index}>
                            <td>{confirmation.name}</td>
                            <td>{confirmation.email}</td>
                            <td>{confirmation.phone}</td>
                            <td className="text-right">
                              {confirmation.adults}
                            </td>
                            <td className="text-right">
                              {confirmation.children}
                            </td>
                            <td className="text-center px-4 py-2">
                              <button
                                type="button"
                                className="py-1 px-3 flex justify-center items-center w-full  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                onClick={() =>
                                  handleModal(confirmation.message)
                                }
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  fill="none"
                                  className="mr-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                Ver
                              </button>
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
