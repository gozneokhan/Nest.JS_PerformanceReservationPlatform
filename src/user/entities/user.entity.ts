import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Role } from '../types/userRole.type';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Index('email', ['email'], { unique: true })
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, name: 'email' })
  email: string;

  @Column({ type: 'varchar', nullable: false, name: 'password' })
  password: string;

  @Column({ type: 'varchar', nullable: false, name: 'name' })
  name: string;

  @Column({ type: 'varchar', nullable: false, name: 'nickName' })
  nickName: string;

  @Column({ type: 'varchar', nullable: false, name: 'gender' })
  gender: string;

  @Column({ type: 'tinyint', nullable: false, name: 'age' })
  age: number;

  @Column({ type: 'varchar', nullable: false, name: 'phone' })
  phone: string;

  @Column({ type: 'varchar', nullable: false, name: 'grade' })
  grade: string;

  @Column({ type: 'varchar', nullable: false, name: 'permission' })
  permission: string;

  @Column({ type: 'enum', enum: Role, default: Role.User, name: 'role' })
  role: Role;

  @Column({ type: 'int', default: 1000000, name: 'points' })
  points: number;

  @CreateDateColumn({ name: 'createdAt', comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt', comment: '삭제일시' })
  deletedAt?: Date | null;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
