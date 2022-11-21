import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Actor } from "./Actor"
import { Movie } from "./Movie"

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(type => Actor) @JoinColumn()
	actor: Actor

	@OneToOne(type => Movie) @JoinColumn()
	movie: Movie

}
