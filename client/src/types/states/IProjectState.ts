/**
 * @type { IProjectState }
 * Member state interface for Redux
 */
export interface IProjectState {
    id: number | null
    sprintId: number | null
    loading: boolean
    error: string | null
}
