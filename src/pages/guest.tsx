import AppLayout from '../components/layouts/AppLayout'
import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import axios from '../lib/axios'

import { toast } from 'react-toastify'
import { useState } from 'react'
import NewGuestModal from '../components/NewGuestModal'

interface Data {
  id: number
  origin?: string
  rating?: string
  treatment?: string
  name?: string
  escorts?: number
  total?: number
  men?: number
  women?: number
  children?: number
  save_the_date?: boolean
  confirmation?: boolean
  invite?: boolean
  gift?: boolean
  created_at?: Date
}

export const getServerSideProps: GetServerSideProps<{
  data: Array<Data>
}> = async () => {
  const res = await axios.get('/api/guest')
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

  const handleInvite = async (id: number, event: React.ChangeEvent) => {
    const option = event.target as HTMLInputElement
    const isChecked = option.checked
    const toastId = toast.loading('Carregando...')

    await axios
      .put('/api/guest/' + id, {
        invite: isChecked,
      })
      .then(() => {
        toast.update(toastId, {
          render: 'Sucesso!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
      })
      .catch((err) => {
        toast.error('Ops, algo errado.')
        console.log(err)
      })
  }

  const handleGift = async (id: number, e: React.ChangeEvent) => {
    const option = e.target as HTMLInputElement
    const isChecked = option.checked
    const toastId = toast.loading('Carregando...')

    await axios
      .put('/api/guest/' + id, {
        gift: isChecked,
      })
      .then(() => {
        toast.update(toastId, {
          render: 'Sucesso!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
      })
      .catch((err) => {
        toast.error('Ops, algo errado.')
        console.log(err)
      })
  }

  const handleConfirmation = async (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const option = e.target as HTMLInputElement
    const isChecked = option.checked
    const toastId = toast.loading('Carregando...')

    await axios
      .put('/api/guest/' + id, {
        confirmation: isChecked,
      })
      .then(() => {
        toast.update(toastId, {
          render: 'Sucesso!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
      })
      .catch((err) => {
        toast.error('Ops, algo errado.')
        console.log(err)
      })
  }

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Lista de Convidados
        </h2>
      }
    >
      <Head>
        <title>Wedding ADM - Lista de Convidados</title>
      </Head>

      <NewGuestModal
        title="Mensagem"
        toggle={open}
        action={() => setOpen(false)}
      />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-end w-full mb-4">
                <button
                  onClick={() => setOpen(true)}
                  className="flex items-center px-6 py-2  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 2304 1792"
                    className="mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1728 448l-384 704h768zm-1280 0l-384 704h768zm821-192q-14 40-45.5 71.5t-71.5 45.5v1291h608q14 0 23 9t9 23v64q0 14-9 23t-23 9h-1344q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h608v-1291q-40-14-71.5-45.5t-45.5-71.5h-491q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h491q21-57 70-92.5t111-35.5 111 35.5 70 92.5h491q14 0 23 9t9 23v64q0 14-9 23t-23 9h-491zm-181 16q33 0 56.5-23.5t23.5-56.5-23.5-56.5-56.5-23.5-56.5 23.5-23.5 56.5 23.5 56.5 56.5 23.5zm1088 880q0 73-46.5 131t-117.5 91-144.5 49.5-139.5 16.5-139.5-16.5-144.5-49.5-117.5-91-46.5-131q0-11 35-81t92-174.5 107-195.5 102-184 56-100q18-33 56-33t56 33q4 7 56 100t102 184 107 195.5 92 174.5 35 81zm-1280 0q0 73-46.5 131t-117.5 91-144.5 49.5-139.5 16.5-139.5-16.5-144.5-49.5-117.5-91-46.5-131q0-11 35-81t92-174.5 107-195.5 102-184 56-100q18-33 56-33t56 33q4 7 56 100t102 184 107 195.5 92 174.5 35 81z"></path>
                  </svg>
                  Adicionar
                </button>
              </div>
              <div className="overflow-x-auto custom-scroll">
                <table className="table table-compact w-full table-auto">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-gray-800 uppercase bg-white border-b border-gray-200 text-left"
                      >
                        Origem
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal  text-gray-800 uppercase bg-white border-b border-gray-200 text-left"
                      >
                        Nome no Convite
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal  text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                      >
                        Acompanhantes
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal  text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                      >
                        Homens
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                      >
                        Mulheres
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal  text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                      >
                        Crianças
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal  text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal  text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                      >
                        Convite
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal  text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                      >
                        Presente
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                      >
                        Confirmação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((guest, index) => {
                      return (
                        <tr
                          key={index}
                          // onDoubleClick={(node, event): void =>
                          //   console.log('Double Click Row', node, event)
                          // }
                        >
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-left">
                            <span className="px-2 py-1 text-xs rounded-full text-indigo-500 border border-indigo-500 undefined ">
                              {guest.origin}
                            </span>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-left">
                            {guest.name}
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                            {guest.escorts}
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                            {guest.men}
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                            {guest.women}
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                            {guest.children}
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                            {guest.total}
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                            <input
                              type="checkbox"
                              className="toggle toggle-success toggle-xs"
                              defaultChecked={guest.invite}
                              onChange={(event) =>
                                handleInvite(guest.id, event)
                              }
                            />
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                            <input
                              type="checkbox"
                              className="toggle toggle-success toggle-xs"
                              defaultChecked={guest.gift}
                              onChange={(event) => handleGift(guest.id, event)}
                            />
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                            <input
                              type="checkbox"
                              className="toggle toggle-success toggle-xs"
                              defaultChecked={guest.confirmation}
                              onChange={(event) =>
                                handleConfirmation(guest.id, event)
                              }
                            />
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
  )
}
