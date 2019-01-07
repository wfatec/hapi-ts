import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("Entries")
export class Entry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({
        nullable: true
    })
    content: string;
}