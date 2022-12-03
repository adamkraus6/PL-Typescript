import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class WatchlistFilter {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	filterType: string

	@Column({default: null})
	genre: string

	@Column({default: null})
	title: string

	@Column({default: null})
	dateFrom: Date

	@Column({default: null})
	dateTo: Date
}
