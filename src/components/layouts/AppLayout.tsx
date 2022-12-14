import React, { PropsWithChildren } from 'react'
import Navigation from './Navigation'
import { useAuth } from '../../hooks/auth'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
export interface Props {
  header: React.ReactNode
}

export default function AppLayout({
  header,
  children,
}: PropsWithChildren<Props>) {
  const { user } = useAuth({ middleware: 'auth' })

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navigation {...user} />

        {/* Page Heading */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  )
}
