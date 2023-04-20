import { ROUTER_URLS } from '@services/routers/urls'
import { RelativeRoutingType } from 'react-router-dom'

export interface IUseNavigate {
    (
        to: ROUTER_URLS,
        options?: {
            replace?: boolean
            state?: any
            relative?: RelativeRoutingType
        }
    ): void
    (delta: number): void
}
