import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from '../lib/axios'
import { toast } from 'react-toastify'

type ModalProps = {
  toggle: boolean
  title: string
  action: () => void
}

export default function NewGuestModal({ toggle, action }: ModalProps) {
  const cancelButtonRef = useRef(null)

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
      const toastId = toast.loading('Carregando...')
      actions.setSubmitting(true)

      await axios
        .post('/api/guest', values)
        .then(() => {
          toast.update(toastId, {
            render: 'Sucesso!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })

          actions.resetForm()
          action()
        })
        .catch((err) => {
          toast.update(toastId, {
            render: 'Ops, algo errado.',
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          })
          console.log(err)
        })

      actions.setSubmitting(false)
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
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xl">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={action}
                        ref={cancelButtonRef}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Adicionar Convidado {formik.isSubmitting}
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        >
                          <form
                            onSubmit={formik.handleSubmit}
                            className="container mx-auto shadow-md "
                          >
                            <div className="space-y-6 bg-white">
                              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                  Origem
                                </h2>
                                <div className="max-w-sm mx-auto md:w-2/3">
                                  <div className="relative">
                                    <select
                                      id="country"
                                      name="country"
                                      autoComplete="country-name"
                                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                              </div>
                              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                  Nome Completo
                                </h2>
                                <div className="max-w-sm mx-auto md:w-2/3">
                                  <div className="relative">
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                      <div className="absolute inset-y-0 left-0 flex items-center">
                                        <select
                                          id="treatment"
                                          name="treatment"
                                          className="h-full pr-4 py-2 pl-2 text-gray-500 bg-transparent border-t border-b border-r border-transparent border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-r-md"
                                          value={formik.values.treatment}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                        >
                                          <option value="Sr.">Sr.</option>
                                          <option value="Sra.">Sra.</option>
                                          <option value="Sr e Familia">
                                            Sr e Familia
                                          </option>
                                          <option value="Sra e Familia">
                                            Sra e Familia
                                          </option>
                                          <option value="Outros">Outros</option>
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
                              </div>
                              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                  Acompanhantes
                                </h2>
                                <div className="max-w-sm mx-auto md:w-2/3">
                                  <div className="relative">
                                    <input
                                      type="number"
                                      id="user-info-name"
                                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                      placeholder="Acompanhantes"
                                      name="escorts"
                                      value={formik.values.escorts}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                  Homens
                                </h2>
                                <div className="max-w-sm mx-auto md:w-2/3">
                                  <div className="relative">
                                    <input
                                      type="number"
                                      id="user-info-phone"
                                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                      placeholder="Homens"
                                      name="men"
                                      value={formik.values.men}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                  Mulheres
                                </h2>
                                <div className="max-w-sm mx-auto md:w-2/3">
                                  <div className="relative">
                                    <input
                                      type="number"
                                      id="user-info-phone"
                                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                      name="women"
                                      placeholder="Mulheres"
                                      value={formik.values.women}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                  Crianças
                                </h2>
                                <div className="max-w-sm mx-auto md:w-2/3">
                                  <div className="relative">
                                    <input
                                      type="number"
                                      id="user-info-phone"
                                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                      name="children"
                                      placeholder="Crianças"
                                      value={formik.values.children}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                                <button
                                  type="submit"
                                  className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                  Cadastrar
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
