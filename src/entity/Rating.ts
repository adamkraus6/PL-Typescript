// Author: Adam Kraus
import {
	Entity,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
	Column,
} from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class Rating {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne((type) => Movie)
	@JoinColumn()
	movie: Movie;

	@Column()
	rating: number;
}
