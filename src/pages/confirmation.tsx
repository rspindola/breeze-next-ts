import AppLayout from '../components/layouts/AppLayout'
import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import axios from '../lib/axios'

interface Data {
  name?: string
  phone?: string
  email?: string
  message?: string
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
  return (
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
                      <th>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((confirmation, index) => {
                      return (
                        <tr key={index}>
                          <td>{confirmation.name}</td>
                          <td>{confirmation.email}</td>
                          <td>{confirmation.phone}</td>
                          <td className="text-right">{confirmation.adults}</td>
                          <td className="text-right">
                            {confirmation.children}
                          </td>
                          <td>{confirmation.message}</td>
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
