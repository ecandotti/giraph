/**
 * @type { IMemberState }
 * Member state interface for Redux
 */
export interface IMemberState {
    id: string | null
    email: string | null
    token: string | null
    loading: boolean
    error: string | null
}
