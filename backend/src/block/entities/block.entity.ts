import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'blocks', timestamps: true, deletedAt: true })
export class Block extends Model<Block> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false })
    from: number;

    @Column({ allowNull: false })
    to: number;

    @Column({ type: 'float', allowNull: false })
    value: number;

    @Column({ allowNull: false })
    prehashcode: string;

    @Column({ allowNull: false })
    hashcode: string;
}
