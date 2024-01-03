import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Show } from '../../show/entities/show.entity';
import { Seat } from '../../seat/entities/seat.entity';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false, name: 'reservationPrice' })
  reservationPrice: number;

  @Column({ type: 'integer', nullable: false, name: 'reservationQuantity' })
  reservationQuantity: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
    name: 'isReservationPossible',
  })
  isReservationPossible: boolean;

  @CreateDateColumn({ name: 'createdAt', comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt', comment: '삭제일시' })
  deletedAt?: Date | null;

  @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Show, (show) => show.reservations, { onDelete: 'CASCADE' })
  show: Show;

  @ManyToOne(() => Seat, (seat) => seat.reservations, { onDelete: 'CASCADE' })
  seat: Seat;
}
