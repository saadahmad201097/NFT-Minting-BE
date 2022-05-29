import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

@Entity('Events')
export class Events extends BaseEntity {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber()
    @Column()
    tokenId: number;

    @IsString()
    @Column()
    assignedTo: string;
}
