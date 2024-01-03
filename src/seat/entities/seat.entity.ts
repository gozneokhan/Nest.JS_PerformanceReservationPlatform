import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Reservation } from '../../reservation/entities/reservation.entity';
import { Show } from '../../show/entities/show.entity';

@Entity({ name: 'seats' })
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, name: 'seatNumber' })
  seatNumber: string;

  @Column({ type: 'varchar', nullable: false, name: 'seatClass' })
  seatClass: string;

  @Column({ type: 'integer', nullable: false, name: 'seatPrice' })
  seatPrice: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
    name: 'seatAvailable',
  })
  seatAvailable: boolean;

  @CreateDateColumn({ name: 'createdAt', comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt', comment: '삭제일시' })
  deletedAt?: Date | null;

  @OneToMany(() => Reservation, (reservation) => reservation.seat)
  reservations: Reservation[];

  @ManyToOne(() => Show, (show) => show.seats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'showId' })
  show: Show[];
}
