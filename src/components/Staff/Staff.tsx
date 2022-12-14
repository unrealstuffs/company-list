import { FC, useState, useEffect } from 'react'
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IStaff } from '../../store/types'
import styles from './styles.module.scss'

interface IProps {
	selectedCompanies: number[]
	selectedStaff: number[]
	selectAllStaff: boolean
	setSelectAllStaff: Function
	setSelectedStaff: Function
}

const Staff: FC<IProps> = ({
	selectedCompanies,
	selectAllStaff,
	selectedStaff,
	setSelectAllStaff,
	setSelectedStaff,
}) => {
	const {
		data: { staff },
	} = useTypedSelector(state => state.data)
	const { addEmployee, removeEmployee, editEmployee } = useActions()

	const defaultNumShow = 10

	const [editingRow, setEditingRow] = useState<IStaff | null>(null)
	const [numShow, setNumShow] = useState<number>(defaultNumShow)

	useEffect(() => {
		setNumShow(defaultNumShow)
	}, [selectedCompanies])

	const checkAllStaffHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectAllStaff(e.currentTarget.checked)
		if (e.currentTarget.checked) {
			setSelectedStaff([
				...staff
					.filter(item => item.companyId === selectedCompanies[0])
					.map(item => item.id),
			])
		} else {
			setSelectedStaff([])
		}
	}

	const checkStaffHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.checked) {
			setSelectedStaff([...selectedStaff, +e.currentTarget.value])
		} else {
			setSelectedStaff(
				selectedStaff.filter(item => item !== +e.currentTarget.value)
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
			setNumShow(Math.min(numShow + 10, staff.length))
		}
	}

	return (
		<div className={styles.staff} onScroll={onScroll}>
			{!selectedCompanies.length && (
				<div className={styles.placeholder}>???????????????? ???? ??????????????</div>
			)}
			{selectedCompanies.length > 1 && (
				<div className={styles.placeholder}>
					?????????????? ???????????? ?????????? ????????????????
				</div>
			)}
			{selectedCompanies.length === 1 && (
				<>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>
									<input
										className={styles.checkbox}
										type='checkbox'
										checked={selectAllStaff}
										onChange={checkAllStaffHandler}
									/>
								</th>
								<th>??????</th>
								<th>??????????????</th>
								<th>??????????????????</th>
							</tr>
						</thead>
						<tbody>
							{staff
								?.filter(o =>
									selectedCompanies.includes(o.companyId)
								)
								.slice(0, numShow)
								.map(item => (
									<tr key={item.id}>
										<td>
											<input
												className={styles.checkbox}
												type='checkbox'
												value={item.id}
												checked={selectedStaff.includes(
													item.id
												)}
												onChange={e =>
													checkStaffHandler(e)
												}
											/>
										</td>
										<td>
											<input
												className={styles.input}
												type='text'
												name='firstName'
												value={
													editingRow &&
													editingRow.id === item.id
														? editingRow.firstName
														: item.firstName
												}
												onChange={changeHandler}
												onFocus={() =>
													setEditingRow(item)
												}
												onBlur={() => {
													editEmployee(editingRow)
													setEditingRow(null)
												}}
											/>
										</td>
										<td>
											<input
												className={styles.input}
												type='text'
												name='lastName'
												value={
													editingRow &&
													editingRow.id === item.id
														? editingRow.lastName
														: item.lastName
												}
												onChange={changeHandler}
												onFocus={() =>
													setEditingRow(item)
												}
												onBlur={() => {
													editEmployee(editingRow)
													setEditingRow(null)
												}}
											/>
										</td>
										<td>
											<input
												className={styles.input}
												type='text'
												name='jobTitle'
												value={
													editingRow &&
													editingRow.id === item.id
														? editingRow.jobTitle
														: item.jobTitle
												}
												onChange={changeHandler}
												onFocus={() =>
													setEditingRow(item)
												}
												onBlur={() => {
													editEmployee(editingRow)
													setEditingRow(null)
												}}
											/>
										</td>
									</tr>
								))}
						</tbody>
					</table>
					<div className={styles.actions}>
						<button
							onClick={() => addEmployee(selectedCompanies[0])}
						>
							<AiOutlinePlus />
						</button>
						<button
							onClick={() => {
								setSelectedStaff([])
								setSelectAllStaff(false)
								removeEmployee(selectedStaff)
							}}
							disabled={!selectedStaff.length}
						>
							<AiOutlineDelete />
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default Staff
