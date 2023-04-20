import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '@layouts/Main'
import Unconnected from '@layouts/Unconnected'
import Connected from '@layouts/Connected'
import Login from '@pages/Guest/Login'
import Register from '@pages/Guest/Register'
import Home from '@pages/Guest/Home'
import Profile from '@pages/Selfcare/Profile'
import { ROUTER_URLS } from '@services/routers/urls'
import MentionsLegales from '@pages/Guest/MentionsLegales'
import Dashboard from '@pages/Selfcare/Dashboard'
import CreateProject from '@pages/Selfcare/Project/CreateProject'
import ProjectDetails from '@pages/Selfcare/Project/ProjectDetails/ProjectDetails'

const RoutersStack: React.FC = () => {
    return (
        <Routes>
            <Route element={<Main />}>
                <Route path={ROUTER_URLS.HOME} element={<Home />} />
                <Route path={ROUTER_URLS.MENTIONS_LEGALES} element={<MentionsLegales />} />
            </Route>
            <Route element={<Unconnected />}>
                <Route path={ROUTER_URLS.LOGIN} element={<Login />} />
                <Route path={ROUTER_URLS.REGISTER} element={<Register />} />
            </Route>
            <Route path="/" element={<Connected />}>
                <Route path={ROUTER_URLS.PROFILE} element={<Profile />} />
                <Route path={ROUTER_URLS.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTER_URLS.PROJECT_DETAILS} element={<ProjectDetails />} />
                <Route path={ROUTER_URLS.PROJECT_CREATE} element={<CreateProject />} />
            </Route>
        </Routes>
    )
}

export default RoutersStack
