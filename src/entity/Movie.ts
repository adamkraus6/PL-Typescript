// Author: Adam Kraus
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Movie {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	released: Date;

	@Column()
	genre: string;
}
