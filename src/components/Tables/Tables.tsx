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
		// <div className={styles.tables}>
		// 	<Table
		// 		add={addCompany}
		// 		edit={editCompany}
		// 		remove={removeCompany}
		// 		columns={['Название компании', 'Адрес', 'Кол-во сотрудников']}
		// 		data={companies}
		// 		selectAllItems={selectAllCompanies}
		// 		setSelectAllItems={setSelectAllCompanies}
		// 		selectedItems={selectedCompanies}
		// 		setSelectedItems={setSelectedCompanies}
		// 	/>
		// 	{!selectedCompanies.length && (
		// 		<div className={styles.placeholder}>Компания не выбрана</div>
		// 	)}
		// 	{selectedCompanies.length > 1 && (
		// 		<div className={styles.placeholder}>
		// 			Выбрано больше одной компании
		// 		</div>
		// 	)}
		// 	{selectedCompanies.length === 1 && (
		// 		<Table
		// 			add={addEmployee}
		// 			edit={editEmployee}
		// 			remove={removeEmployee}
		// 			columns={['Имя', 'Фамилия', 'Должность']}
		// 			data={staff?.filter(o =>
		// 				selectedCompanies.includes(o.companyId)
		// 			)}
		// 			selectAllItems={selectAllStaff}
		// 			setSelectAllItems={setSelectAllStaff}
		// 			selectedItems={selectedStaff}
		// 			setSelectedItems={setSelectedStaff}
		// 		/>
		// 	)}
		// </div>
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
