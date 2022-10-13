import styles from './styles.module.scss'
import { useState } from 'react'
import Companies from '../Companies/Companies'
import Staff from '../Staff/Staff'

const Tables = () => {
	const [selectAllCompanies, setSelectAllCompanies] = useState(false)
	const [selectAllStaff, setSelectAllStaff] = useState(false)

	const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])
	const [selectedStaff, setSelectedStaff] = useState<number[]>([])

	return (
		<div className={styles.tables}>
			<Companies
				selectAllCompanies={selectAllCompanies}
				selectedCompanies={selectedCompanies}
				setSelectAllCompanies={setSelectAllCompanies}
				setSelectedCompanies={setSelectedCompanies}
			/>
			<Staff
				selectAllStaff={selectAllStaff}
				selectedCompanies={selectedCompanies}
				selectedStaff={selectedStaff}
				setSelectAllStaff={setSelectAllStaff}
				setSelectedStaff={setSelectedStaff}
			/>
		</div>
	)
}

export default Tables
