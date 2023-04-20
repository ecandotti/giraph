import { ITicket } from '@/types/ticket/ITicket'
import { IoMdAdd } from 'react-icons/io'
import { HiOutlineRefresh } from 'react-icons/hi'
import TicketCard from '@components/TicketCard/TicketCard'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import api from '@services/api'
import { API_URLS } from '@services/api/urls'
import React, { useEffect, useState } from 'react'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { generatePath } from 'react-router-dom'
import { Status } from '@/types/status/Status'
import Modal from '@components/Modal'
import AddTicket from '@components/Modal/AddTicket/AddTicket'
import { IProject } from '@/types/project/IProject'
import { setProject } from '@features/project/projectSlice'

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector(state => state.member)
    const projectId = useAppSelector(state => state.project.id)
    const sprintId = useAppSelector(state => state.project.sprintId)

    const [open, setOpen] = useState(false)
    const [projectList, setProjectList] = useState<IProject[]>()
    const [newProject, setNewProject] = useState({
        title: '',
        description: ''
    })
    const [newTickets, setNewTickets] = useState<ITicket[]>([])
    const [inProgressTickets, setInProgressTickets] = useState<ITicket[]>([])
    const [codeReviewTickets, setCodeReviewTickets] = useState<ITicket[]>([])
    const [endedTickets, setEndedTickets] = useState<ITicket[]>([])

    const [updatedTick, setUpdatedTrick] = useState(false)

    const createProjectAndSelectIt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const { data } = await api.post(
                API_URLS.CREATE_PROJECT,
                {
                    title: newProject.title,
                    description: newProject.description
                },
                {
                    headers: { Authorization: `${token}` }
                }
            )

            dispatch(setProject({ id: data.project.id, sprintId: data.project.sprints[-1].id }))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getAllProjects = async () => {
            try {
                const { data } = await api.get(API_URLS.GET_PROJECTS, {
                    headers: { Authorization: `${token}` }
                })

                setProjectList(data.projects)
            } catch (error) {
                console.log(error)
            }
        }

        getAllProjects()
    }, [dispatch])

    if (projectId === null && sprintId === null) {
        return (
            <div className="py-20 flex flex-col justify-center items-center">
                <div className="mb-5">Pas de projet selectionné</div>
                <div className="flex flex-col items-center gap-4">
                    {projectList && projectList?.length > 0 ? (
                        <div className="flex gap-4 items-center justify-between">
                            <select className="rounded-full bg-yellow-500 py-2 px-4 cursor-pointer">
                                {projectList.map(project => (
                                    <option
                                        key={project.id}
                                        value={project.id}
                                        onClick={() =>
                                            dispatch(
                                                setProject({
                                                    id: project.id,
                                                    sprintId: project.sprints[project.sprints.length - 1].id
                                                })
                                            )
                                        }
                                    >
                                        {project.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : null}
                    <form onSubmit={createProjectAndSelectIt}>
                        <h1 className="mb-8 text-center">Créer un projet</h1>
                        <div className="flex items-center justify-between gap-2 mb-5">
                            <label htmlFor="title">Titre</label>
                            <div className="flex justify-center items-center gap-4">
                                <input
                                    type="text"
                                    id="title"
                                    className="px-4 py-2 rounded-md border"
                                    value={newProject?.title}
                                    onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mb-5">
                            <label htmlFor="description">Description</label>
                            <div className="flex justify-center items-center gap-4">
                                <input
                                    type="text"
                                    id="description"
                                    className="px-4 py-2 rounded-md border"
                                    value={newProject?.description}
                                    onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-center gap-2 rounded-full bg-green-600 py-2 px-6 text-white cursor-pointer"
                        >
                            Ajouter
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    const getNewTickets = async (projectId: number) => {
        try {
            const { data } = await api.get(
                generatePath(API_URLS.GET_TICKETS, { status: Status.NEW, projectId: String(projectId) }),
                {
                    headers: { Authorization: `${token}` }
                }
            )

            setNewTickets(data.tickets)
        } catch (error) {
            console.log(error)
        }
    }

    const getCodeReviewTickets = async (projectId: number) => {
        try {
            const { data } = await api.get(
                generatePath(API_URLS.GET_TICKETS, { status: Status.PENDING_REVIEW, projectId: String(projectId) }),
                {
                    headers: { Authorization: `${token}` }
                }
            )

            setCodeReviewTickets(data.tickets)
        } catch (error) {
            console.log(error)
        }
    }

    const getInProgressTickets = async (projectId: number) => {
        try {
            const { data } = await api.get(
                generatePath(API_URLS.GET_TICKETS, { status: Status.IN_PROGRESS, projectId: String(projectId) }),
                {
                    headers: { Authorization: `${token}` }
                }
            )

            setInProgressTickets(data.tickets)
        } catch (error) {
            console.log(error)
        }
    }

    const getEndedTickets = async (projectId: number) => {
        try {
            const { data } = await api.get(
                generatePath(API_URLS.GET_TICKETS, { status: Status.ENDED, projectId: String(projectId) }),
                {
                    headers: { Authorization: `${token}` }
                }
            )

            setEndedTickets(data.tickets)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTickets = async (projectId: number) => {
        await getNewTickets(projectId)
        await getInProgressTickets(projectId)
        await getEndedTickets(projectId)
        await getCodeReviewTickets(projectId)
    }

    useEffect(() => {
        if (projectId) {
            getAllTickets(projectId)

            if (updatedTick) {
                console.log('Updated ticket')
            }

            setUpdatedTrick(false)
        }
    }, [updatedTick, setUpdatedTrick, projectId, dispatch])

    return (
        <>
            <div className="h-full container mx-auto relative bg-slate-100 dark:bg-slate-800 text-base transition-colors">
                {projectList && projectList?.length > 0 ? (
                    <select
                        className="rounded-full bg-yellow-500 py-2 px-4 my-10 cursor-pointer"
                        onChange={e =>
                            dispatch(
                                setProject({ id: e.target.value, sprintId: projectList[Number(e.target.value)].sprints[-1].id })
                            )
                        }
                    >
                        {projectList.map(project => (
                            <option key={project.id} value={project.id}>
                                {project.title}
                            </option>
                        ))}
                    </select>
                ) : null}
                <div className="flex justify-between items-center mb-10">
                    <span className="text-center font-bold">Sprint n°{sprintId}</span>
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-600 p-2 cursor-pointer" onClick={() => console.log('ok')}>
                            <IoMdAdd size={20} color="#ffffff" onClick={() => setOpen(true)} />
                        </div>
                        <div className="rounded-full bg-yellow-500 p-2 cursor-pointer" onClick={() => getAllTickets(projectId!)}>
                            <HiOutlineRefresh size={20} color="#ffffff" className="text-white" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-around rounded-lg select-none h-full">
                    <div className="flex-1 flex flex-col">
                        <div className="sticky top-0 z-10 text-center bg-gray-200 dark:bg-gray-600 p-4 rounded-tl-lg">
                            Non traité
                        </div>
                        {newTickets?.map(ticket => (
                            <TicketCard ticket={ticket} setUpdatedTrick={setUpdatedTrick} key={ticket.id} />
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="sticky top-0 z-10 text-center bg-gray-200 dark:bg-gray-700 dark:text-white p-4">
                            En cours
                        </div>
                        {inProgressTickets?.map(ticket => (
                            <TicketCard ticket={ticket} setUpdatedTrick={setUpdatedTrick} key={ticket.id} />
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="sticky top-0 z-10 text-center bg-gray-200 dark:bg-gray-800 p-4">Revue de code</div>
                        {codeReviewTickets?.map(ticket => (
                            <TicketCard ticket={ticket} setUpdatedTrick={setUpdatedTrick} key={ticket.id} />
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="sticky top-0 z-10 text-center bg-gray-300 dark:bg-gray-900 p-4 rounded-tr-lg">
                            <div className="relative text-center">
                                Terminé
                                <button
                                    title="Nettoyer la colonne"
                                    className="absolute right-0 -top-1 flex items-center justify-center p-2 bg-red-600 rounded-full text-white hover:scale-105 transition"
                                >
                                    <MdOutlineCleaningServices />
                                </button>
                            </div>
                        </div>
                        {endedTickets?.map(ticket => (
                            <TicketCard ticket={ticket} setUpdatedTrick={setUpdatedTrick} key={ticket.id} />
                        ))}
                    </div>
                </div>
            </div>
            {open ? (
                <Modal open={open} setOpen={setOpen}>
                    <AddTicket
                        setOpen={setOpen}
                        newTickets={newTickets}
                        setNewTickets={setNewTickets}
                        projectId={projectId!}
                        sprintId={sprintId!}
                    />
                </Modal>
            ) : null}
        </>
    )
}

export default Dashboard
