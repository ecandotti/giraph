/**
 * @enum { API_URLS }
 * Routes of Giraph API.
 */
export enum API_URLS {
    LOGIN = '/member/login',
    REGISTER = '/member/register',
    GET_PROJECTS = '/project',
    CREATE_PROJECT = '/project',
    GET_TICKETS = '/ticket/:projectId/:status',
    ADD_TICKET = '/ticket',
    UPDATE_STATUS = '/ticket/:id/:status'
}
