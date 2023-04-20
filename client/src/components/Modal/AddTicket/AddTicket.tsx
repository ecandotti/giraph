import { ITicket } from '@/types/ticket/ITicket'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import api from '@services/api'
import { API_URLS } from '@services/api/urls'
import { useAppSelector } from '@hooks/redux'

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    newTickets: ITicket[]
    setNewTickets: React.Dispatch<React.SetStateAction<ITicket[]>>
    projectId: number
    sprintId: number
}

const AddTicket: React.FC<Props> = ({ setOpen, newTickets, setNewTickets, projectId, sprintId }) => {
    const token = useAppSelector(state => state.member.token)

    const [loading, setLoading] = useState(false)
    const [newTicket, setNewTicket] = useState({
        title: '',
        description: ''
    })

    const handleAddTicket = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        setLoading(true)
        try {
            const { data } = await api.post(
                API_URLS.ADD_TICKET,
                {
                    title: newTicket?.title,
                    description: newTicket?.title,
                    projectId: projectId,
                    sprintId: sprintId
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            )

            if (data.success as boolean) {
                toast(data.message, { type: 'success' })
                setNewTickets([...newTickets, data.ticket])
                setOpen(false)
            } else {
                toast(data.message, { type: 'warning' })
            }
        } catch (error) {
            toast('Erreur API', { type: 'warning' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleAddTicket} className="flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-5">
                    <label htmlFor="title">Titre</label>
                    <div className="flex justify-center items-center gap-4">
                        <input
                            type="text"
                            id="title"
                            className="px-4 py-2 rounded-md border"
                            value={newTicket?.title}
                            onChange={e => setNewTicket({ ...newTicket, title: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2 mb-5">
                    <label htmlFor="description">Description</label>
                    <div className="flex justify-center items-center gap-4">
                        <input
                            id="description"
                            type="text"
                            className="px-4 py-2 rounded-md border"
                            value={newTicket?.description}
                            onChange={e => setNewTicket({ ...newTicket, description: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="text-right">
                    <button
                        disabled={loading}
                        type="submit"
                        className={`px-4 py-2 rounded-full ${loading ? 'bg-green-400' : 'bg-green-600'} text-white font-bold`}
                    >
                        {loading ? 'Chargement...' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTicket
