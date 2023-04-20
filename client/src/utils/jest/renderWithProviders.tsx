import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { setupStore } from '@services/redux/store'
import { render, RenderOptions } from '@testing-library/react'
import { PreloadedState } from '@reduxjs/toolkit'
import { RootState } from '@/types/redux'
import store from '@services/redux/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: typeof store
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {
            member: {
                id: null,
                email: null,
                token: null,
                loading: false,
                error: null
            }
        },
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
