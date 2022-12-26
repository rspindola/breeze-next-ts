import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from '../lib/axios'
import { toast } from 'react-toastify'

type ModalProps = {
  toggle: boolean
  title: string
  action: () => void
}

interface GuestData {
  origin: string
  treatment: string
  name: string
  escorts: number
  men: number
  women: number
  children: number
}

export default function NewGuestModal({ toggle, action }: ModalProps) {
  const cancelButtonRef = useRef(null)

  const addGuest = async (data: GuestData) => {
    const toastId = toast.loading('Carregando...')

    await axios
      .post('/api/guest', data)
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

  const formik = useFormik({
    initialValues: {
      origin: 'Familia do noivo',
      treatment: 'Sr.',
      name: '',
      escorts: 0,
      men: 0,
      women: 0,
      children: 0,
    },
    onSubmit: async (values, actions) => {
      console.log(values)
      await addGuest(values)
      // actions.setSubmitting(false)
      actions.resetForm()
    },
    validationSchema: yup.object({
      origin: yup.string().trim().required('Name is required'),
      treatment: yup.string().trim().required('Name is required'),
      name: yup.string().trim().required('Name is required'),
      escorts: yup.number().required('Name is required'),
      men: yup.number().required('Name is required'),
      women: yup.number().required('Name is required'),
      children: yup.number().required('Name is required'),
    }),
  })

  return (
    <Transition.Root show={toggle} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={action}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={formik.handleSubmit}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Incluir convidado
                        </Dialog.Title>
                        <div className="mt-4">
                          <div className="flex flex-col max-w-md bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="flex-col mb-2">
                              <div className="relative">
                                <select
                                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  name="origin"
                                  value={formik.values.origin}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                >
                                  <option value="Familia do noivo">
                                    Familia do noivo
                                  </option>
                                  <option value="Familia da noiva">
                                    Familia da noiva
                                  </option>
                                  <option value="Amigos do noivo<">
                                    Amigos do noivo
                                  </option>
                                  <option value="Amigos da noiva">
                                    Amigos da noiva
                                  </option>
                                  <option value="Amigos dos pais do noivo">
                                    Amigos dos pais do noivo
                                  </option>
                                  <option value="Amigos dos pais da noiva">
                                    Amigos dos pais da noiva
                                  </option>
                                  <option value="Outros">Outros</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex flex-col mb-2">
                              <div className="relative">
                                <div className="relative mt-1 rounded-md shadow-sm">
                                  <div className="absolute inset-y-0 left-0 flex items-center">
                                    <label
                                      htmlFor="treatment"
                                      className="sr-only"
                                    >
                                      Currency
                                    </label>
                                    <select
                                      id="treatment"
                                      name="treatment"
                                      className="h-full pr-4 py-2 pl-2 text-gray-500 bg-transparent border-t border-b border-r border-transparent border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-r-md"
                                      value={formik.values.treatment}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    >
                                      <option>Sr.</option>
                                      <option>Sra.</option>
                                      <option>Sr e Familia</option>
                                      <option>Sra e Familia</option>
                                    </select>
                                  </div>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full pl-28 py-2 pr-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Nome Completo"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-4 mb-2">
                              <div className="relative">
                                <input
                                  type="number"
                                  id="create-account-first-name"
                                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 pl-2 pr-1 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  name="escorts"
                                  placeholder="Acompanhantes"
                                  value={formik.values.escorts}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                              </div>
                              <div className="relative">
                                <input
                                  type="number"
                                  id="create-account-last-name"
                                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 pl-2 pr-1 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  name="men"
                                  placeholder="Homens"
                                  value={formik.values.men}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                              </div>
                              <div className="relative">
                                <input
                                  type="number"
                                  id="create-account-last-name"
                                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 pl-2 pr-1 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  name="women"
                                  placeholder="Mulheres"
                                  value={formik.values.women}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                              </div>
                              <div className="relative">
                                <input
                                  type="number"
                                  id="create-account-last-name"
                                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 pl-2 pr-1 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  name="children"
                                  placeholder="Crianças"
                                  value={formik.values.children}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={action}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
