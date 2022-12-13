import AppLayout from '../components/layouts/AppLayout'
import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import axios from '../lib/axios'

import { toast } from 'react-toastify'

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
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="overflow-x-auto">
                <table className="table table-compact w-full table-auto">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left">Origem</th>
                      <th className="text-left">Nome no Convite</th>
                      <th className="text-right">Acompanhantes</th>
                      <th className="text-right">Homens</th>
                      <th className="text-right">Mulheres</th>
                      <th className="text-right">Crianças</th>
                      <th className="text-right">Total</th>
                      <th className="text-center">Convite</th>
                      <th className="text-center">Presente</th>
                      <th className="text-center">Confirmação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((guest, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-left">
                            <span className="badge badge-primary badge-outline">
                              {guest.origin}
                            </span>
                          </td>
                          <td className="text-left">{guest.name}</td>
                          <td className="text-right">{guest.escorts}</td>
                          <td className="text-right">{guest.men}</td>
                          <td className="text-right">{guest.women}</td>
                          <td className="text-right">{guest.children}</td>
                          <td className="text-right">{guest.total}</td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              className="toggle toggle-success toggle-xs"
                              defaultChecked={guest.invite}
                              onChange={(event) =>
                                handleInvite(guest.id, event)
                              }
                            />
                          </td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              className="toggle toggle-success toggle-xs"
                              defaultChecked={guest.gift}
                              onChange={(event) => handleGift(guest.id, event)}
                            />
                          </td>
                          <td className="text-center">
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
