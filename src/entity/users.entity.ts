import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './../interfaces/users.interface';


@Entity()
@Unique(['email'])
@Unique(['username'])
export class UserEntity implements User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;
    
    @Column()
    @IsNotEmpty()
    username: string;

    @Column()
    @IsNotEmpty()
    email: string;

    @Column({select:false})
    @IsNotEmpty()
    password: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @CreateDateColumn()
    updatedAt: Date;
}