import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { formatDate } from '@utils/date/formatDate'
import api from '@services/api'
import { ITicket } from '@/types/ticket/ITicket'
import { API_URLS } from '@services/api/urls'
import { useAppSelector } from '@hooks/redux'
import Modal from '@components/Modal'

type Props = {
    ticket: ITicket
    setUpdatedTrick?: React.Dispatch<React.SetStateAction<boolean>>
}

const TicketCard: React.FC<Props> = ({ ticket, setUpdatedTrick }) => {
    const { token } = useAppSelector(state => state.member)

    const { id, title, createdAt, description, status, flag } = ticket

    const [statusId, setStatusId] = useState(0)
    const [open, setOpen] = useState(false)

    const dateTicket = formatDate(createdAt)

    const updateStatus = async (e: Event) => {
        e.preventDefault()

        try {
            const { data } = await api.get(`${API_URLS.UPDATE_STATUS}/${id}/${statusId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data.success) {
                if (setUpdatedTrick) {
                    setUpdatedTrick(true)
                }
                toast('Status mis à jour avec succès le locataire à était mis au courant', {
                    theme: 'light',
                    type: 'success'
                })
            }
        } catch (error) {
            console.log(error)
            toast('Erreur est survenue', {
                theme: 'light',
                type: 'error'
            })
        }
    }

    return (
        <>
            <div
                className="relative p-4 cursor-pointer bg-white dark:bg-indigo-900"
                title="Voir plus d'info"
                onClick={() => setOpen(true)}
                onDrag={e => console.log(e)}
            >
                <div>
                    <strong>{title}</strong>
                </div>
                <div>{description}</div>
                <div>{dateTicket}</div>
            </div>
            {open ? (
                <Modal open={open} setOpen={setOpen}>
                    <>
                        <div className="relative p-4">
                            <div className="absolute top-0 right-0 hover:scale-110 transition" title="Fermer">
                                <button onClick={() => setOpen(false)}>
                                    <IoClose size={24} />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col text-slate-800 dark:text-slate-100">
                            <div className="flex items-center justify-between font-bold mb-10">
                                <div>
                                    Ticket n°{id} : {title}
                                </div>
                                <form onSubmit={updateStatus as any}>
                                    <div className="flex items-center">
                                        <select
                                            className="p-2 rounded-lg dark:bg-slate-700"
                                            defaultValue={statusId}
                                            onChange={e => setStatusId(Number(e.target.value))}
                                        >
                                            <option value="0">Non traîté</option>
                                            <option value="1">En cours</option>
                                            <option value="2">Terminé</option>
                                        </select>
                                        <button
                                            type="submit"
                                            title="Valider l'action"
                                            className="ml-2 hover:scale-105 transition"
                                        >
                                            <BsFillCheckCircleFill color="green" size={24} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center mb-3">
                                <strong>Flashé le :</strong> <span className="ml-2">{dateTicket}</span>
                            </div>
                            <div className="flex items-center mb-3">
                                <strong>Flag :</strong>
                                <strong>{flag?.title}</strong>
                            </div>
                            <div className="w-full border-b mb-3"></div>
                            <div className="flex items-center mb-3">
                                Description :<p className="ml-2">{description ?? 'Vide'}</p>
                            </div>
                        </div>
                    </>
                </Modal>
            ) : null}
        </>
    )
}

export default TicketCard
