import { Table, Column, Model, DataType, AllowNull} from 'sequelize-typescript'
import { Optional } from 'sequelize'

interface StoreAttributes {
  id: number
  name: string
}

interface StoreCreationAttributes extends Optional<StoreAttributes, 'id'> {}

@Table({
  timestamps: true
})

class Store extends Model <StoreAttributes, StoreCreationAttributes> {
  @Column(DataType.TEXT)
  name: string | undefined
}

export {Store}