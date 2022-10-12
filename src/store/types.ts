export interface ICompanies {
	id: number
	title: string
	address: string
}

export interface IStaff {
	id: number
	companyId: number
	firstName: string
	lastName: string
	jobTitle: string
}
