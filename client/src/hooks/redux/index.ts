import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/types/redux'

/**
 * Manage state of redux.
 *
 * @example
 * Logout member:
 * ```
 * const global = useAppDispatch()
 *
 * useAppDispatch(logoutMember())
 * // Will clear all data of member
 * ```
 */
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * Get state of redux.
 *
 * @example
 * Get all states:
 * ```
 * const global = useAppSelector(state)
 * // Return global states
 * ```
 *
 * @example
 * Get member states:
 * ```
 * const member = useAppSelector(state => state.member)
 * // Return  IMemberState
 * ```
 *
 * @returns State of redux.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
