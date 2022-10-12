import { FC, useState } from 'react'
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import { ICompanies, IStaff } from '../../store/types'
import styles from './styles.module.scss'

type Data = ICompanies | IStaff

interface IProps {
	data: any[]
	columns: string[]
	add: Function
	remove: Function
	edit: Function
	selectedItems: number[]
	setSelectedItems: Function
	selectAllItems: boolean
	setSelectAllItems: Function
}

const Table: FC<IProps> = ({
	data,
	columns,
	add,
	remove,
	edit,
	selectedItems,
	setSelectedItems,
	selectAllItems,
	setSelectAllItems,
}) => {
	const [numShow, setNumShow] = useState<number>(10)
	const [editingRow, setEditingRow] = useState<any>(null)

	const checkAllItemsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectAllItems(e.currentTarget.checked)
		if (e.currentTarget.checked) {
			setSelectedItems([...data.map(item => item.id)])
		} else {
			setSelectedItems([])
		}
	}

	const checkItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.checked) {
			setSelectedItems([...selectedItems, +e.currentTarget.value])
		} else {
			setSelectedItems(
				selectedItems.filter(item => item !== +e.currentTarget.value)
			)
		}
	}

	const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
		if (
			e.currentTarget.offsetHeight + e.currentTarget.scrollTop ===
			e.currentTarget.scrollHeight
		) {
			setNumShow(Math.min(numShow + 10, data && data.length))
		}
	}

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditingRow((prev: any) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	return (
		<div className={styles.container} onScroll={onScroll}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>
							<input
								className={styles.checkbox}
								type='checkbox'
								checked={selectAllItems}
								onChange={checkAllItemsHandler}
							/>
						</th>
						{columns.map(col => (
							<th>{col}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data?.slice(0, numShow).map(item => (
						<tr
							key={item.id}
							className={
								selectedItems.includes(item.id)
									? styles.selected
									: ''
							}
						>
							<td>
								<input
									className={styles.checkbox}
									type='checkbox'
									value={item.id}
									checked={selectedItems.includes(item.id)}
									onChange={e => checkItemHandler(e)}
								/>
							</td>
							{Object.keys(item).map((key, i) => {
								if (key !== 'id' && key !== 'companyId') {
									return (
										<td key={i}>
											<input
												className={styles.input}
												type='text'
												name={item[key]}
												value={
													editingRow &&
													editingRow.id === item.id
														? editingRow[key]
														: item[key]
												}
												onChange={changeHandler}
												onFocus={() =>
													setEditingRow(item)
												}
												onBlur={() => {
													edit(editingRow)
													setEditingRow(null)
												}}
											/>
										</td>
									)
								}
							})}
							{item.title && (
								<td>
									0
									{/* {
									staff.filter(i => i.companyId === item.id)
									.length
								} */}
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.actions}>
				<button onClick={() => add()}>
					<AiOutlinePlus />
				</button>
				<button
					onClick={() => {
						setSelectedItems([])
						setSelectAllItems(false)
						remove(selectedItems)
					}}
					disabled={!selectedItems.length}
				>
					<AiOutlineDelete />
				</button>
			</div>
		</div>
	)
}

export default Table
