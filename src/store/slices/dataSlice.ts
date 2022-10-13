import { createSlice } from '@reduxjs/toolkit'
import { ICompanies, IStaff } from '../types'

// IMPORT DATA
// Short data
// import { companies, staff } from '../../constants/data'

// Long data
import { companies, staff } from '../../constants/data_long'

interface DataState {
	data: {
		companies: ICompanies[]
		staff: IStaff[]
	}
}

const initialState: DataState = {
	data: {
		companies,
		staff,
	},
}

const generateUniqueId = () => {
	return parseInt(
		Math.ceil(Math.random() * Date.now())
			.toPrecision(16)
			.toString()
			.replace('.', '')
	)
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		addCompany(state) {
			state.data.companies?.push({
				id: generateUniqueId(),
				title: 'Пустое название',
				address: 'Пустой адрес',
			})
		},
		editCompany(state, action) {
			const {
				payload: { id, title, address },
			} = action

			state.data.companies = state.data.companies.map(company =>
				company.id === id ? { ...company, title, address } : company
			)
		},
		removeCompany(state, action) {
			state.data.companies = state.data.companies?.filter(
				item => action.payload.indexOf(item.id) === -1
			)
			state.data.staff = state.data.staff?.filter(
				item => action.payload.indexOf(item.companyId) === -1
			)
		},
		addEmployee(state, action) {
			state.data.staff?.push({
				id: generateUniqueId(),
				companyId: action.payload,
				firstName: 'Пустое имя',
				lastName: 'Пустая фамилия',
				jobTitle: 'Пустая должность',
			})
		},
		editEmployee(state, action) {
			const {
				payload: { id, firstName, lastName, jobTitle },
			} = action

			state.data.staff = state.data.staff.map(employee =>
				employee.id === id
					? { ...employee, firstName, lastName, jobTitle }
					: employee
			)
		},
		removeEmployee(state, action) {
			state.data.staff = state.data.staff?.filter(
				item => action.payload.indexOf(item.id) === -1
			)
		},
	},
})

export const dataActions = dataSlice.actions
export const dataReducer = dataSlice.reducer
