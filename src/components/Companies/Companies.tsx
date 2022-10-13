import { FC, useState } from 'react'
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ICompanies } from '../../store/types'
import styles from './styles.module.scss'

interface IProps {
	selectedCompanies: number[]
	setSelectedCompanies: Function
	selectAllCompanies: boolean
	setSelectAllCompanies: Function
}

const Companies: FC<IProps> = ({
	selectedCompanies,
	setSelectedCompanies,
	selectAllCompanies,
	setSelectAllCompanies,
}) => {
	const {
		data: { companies, staff },
	} = useTypedSelector(state => state.data)
	const { addCompany, editCompany, removeCompany } = useActions()

	const [editingRow, setEditingRow] = useState<ICompanies | null>(null)
	const [numShow, setNumShow] = useState<number>(10)

	const checkAllCompaniesHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setSelectAllCompanies(e.currentTarget.checked)
		if (e.currentTarget.checked) {
			setSelectedCompanies([...companies.map(item => item.id)])
		} else {
			setSelectedCompanies([])
		}
	}

	const checkCompanyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.checked) {
			setSelectedCompanies([...selectedCompanies, +e.currentTarget.value])
		} else {
			setSelectedCompanies(
				selectedCompanies.filter(
					item => item !== +e.currentTarget.value
				)
			)
		}
	}

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditingRow((prev: any) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
		if (
			e.currentTarget.offsetHeight + e.currentTarget.scrollTop ===
			e.currentTarget.scrollHeight
		) {
			setNumShow(Math.min(numShow + 10, companies.length))
		}
	}

	return (
		<div className={styles.companies} onScroll={onScroll}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>
							<input
								className={styles.checkbox}
								type='checkbox'
								checked={selectAllCompanies}
								onChange={checkAllCompaniesHandler}
							/>
						</th>
						<th>Название компании</th>
						<th>Адрес</th>
						<th>Кол-во сотрудников</th>
					</tr>
				</thead>
				<tbody>
					{companies?.slice(0, numShow).map(item => (
						<tr
							key={item.id}
							className={
								selectedCompanies.includes(item.id)
									? styles.selected
									: ''
							}
						>
							<td>
								<input
									className={styles.checkbox}
									type='checkbox'
									value={item.id}
									checked={selectedCompanies.includes(
										item.id
									)}
									onChange={e => checkCompanyHandler(e)}
								/>
							</td>
							<td>
								<input
									className={styles.input}
									type='text'
									name='title'
									value={
										editingRow && editingRow.id === item.id
											? editingRow.title
											: item.title
									}
									onChange={changeHandler}
									onFocus={() => setEditingRow(item)}
									onBlur={() => {
										editCompany(editingRow)
										setEditingRow(null)
									}}
								/>
							</td>
							<td>
								<input
									className={styles.input}
									type='text'
									name='address'
									value={
										editingRow && editingRow.id === item.id
											? editingRow.address
											: item.address
									}
									onChange={changeHandler}
									onFocus={() => setEditingRow(item)}
									onBlur={() => {
										editCompany(editingRow)
										setEditingRow(null)
									}}
								/>
							</td>
							<td>
								{
									staff.filter(i => i.companyId === item.id)
										.length
								}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.actions}>
				<button onClick={() => addCompany()}>
					<AiOutlinePlus />
				</button>
				<button
					onClick={() => {
						setSelectedCompanies([])
						setSelectAllCompanies(false)
						removeCompany(selectedCompanies)
					}}
					disabled={!selectedCompanies.length}
				>
					<AiOutlineDelete />
				</button>
			</div>
		</div>
	)
}

export default Companies
