// Author: Adam Kraus
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Actor {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;
}
