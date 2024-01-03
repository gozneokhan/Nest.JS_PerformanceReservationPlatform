import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Reservation } from '../../reservation/entities/reservation.entity';
import { Seat } from '../../seat/entities/seat.entity';

@Entity({ name: 'shows' })
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false, name: 'showPoster' })
  showPoster: number;

  @Column({ type: 'varchar', nullable: false, name: 'showTitle' })
  showTitle: string;

  @Column({ type: 'varchar', nullable: false, name: 'showCast' })
  showCast: string;

  @Column({ type: 'varchar', nullable: false, name: 'showGenre' })
  showGenre: string;

  @Column({ type: 'varchar', nullable: false, name: 'showDescription' })
  showDescription: string;

  @Column({ type: 'varchar', nullable: false, name: 'showDateTime' })
  showDateTime: string;

  @Column({ type: 'varchar', nullable: false, name: 'showVenue' })
  showVenue: string;

  @Column({ type: 'date', nullable: false, name: 'showRunTime' })
  showRunTime: Date;

  @Column({ type: 'integer', nullable: false, name: 'showAgeRating' })
  showAgeRating: number;

  @Column({ type: 'integer', nullable: false, name: 'ticketPrice' })
  ticketPrice: number;

  @Column({ type: 'integer', nullable: false, name: 'seat' })
  seat: number;

  @CreateDateColumn({ name: 'createdAt', comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt', comment: '삭제일시' })
  deletedAt?: Date | null;

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservations: Reservation[];

  @OneToMany(() => Seat, (seat) => seat.show)
  seats: Seat[];
}
