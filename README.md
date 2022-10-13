# Тестовое задание "Список компаний"

Запуск приложения:

### `npm start`

Для тестирования работы таблицы с разным количеством данных, нужно перейти в /src/store/slices/dataSlice.ts и оставить только одну из приведенных ниже строк

    // Short data

    import { companies, staff } from '../../constants/data'

    // Long data

    // import { companies, staff } from '../../constants/data_long'

В первой загружается массив с 20 объектами, во второй массив с 10 000 объектов
