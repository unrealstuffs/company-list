# Тестовое задание "Список компаний"

Запуск приложения:

### `npm start`

Для тестирования функционала динамической загрузки данных в таблице при скролле, нужно перейти в src/store/slices/dataSlice.ts, и оставить только вторую строку.

// Short data
import { companies, staff } from '../../constants/data'

// Long data
// import { companies, staff } from '../../constants/data_long'

В первой загружается массив с 20 объектами, во второй массив с 10 000 объектов
