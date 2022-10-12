import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'

const Container: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={styles.container}>{children}</div>
}

export default Container
