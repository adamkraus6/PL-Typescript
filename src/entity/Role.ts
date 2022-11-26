import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Actor } from "./Actor"
import { Movie } from "./Movie"

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Actor) @JoinColumn()
	actor: Actor

	@ManyToOne(type => Movie) @JoinColumn()
	movie: Movie

}
