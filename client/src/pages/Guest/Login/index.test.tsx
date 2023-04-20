import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@utils/jest/renderWithProviders'
import { MemoryRouter } from 'react-router-dom'
import Login from './index'
import { ROUTER_URLS } from '@services/routers/urls'

const useMockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => useMockedNavigate
}))

describe('Login', () => {
    it('Redirect Register page on click ', async () => {
        const user = userEvent.setup()

        renderWithProviders(
            <MemoryRouter initialEntries={[ROUTER_URLS.LOGIN]}>
                <Login />
            </MemoryRouter>
        )

        const registerBtn = screen.getByText('Pas de compte ? Inscrivez vous')
        expect(registerBtn).not.toBeDisabled()

        expect(screen.getByText('Pas de compte ? Inscrivez vous')).toBeInTheDocument()
        await user.click(registerBtn)
        expect(useMockedNavigate).toHaveBeenCalledWith(ROUTER_URLS.REGISTER)
    })
})
