import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  publicAddress: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: null })
  firstName: string;

  @Column({ default: null })
  lastDailyScanRewards: string;

  @Column({ default: null })
  lastName: string;

  @Column({ default: null })
  bio: string;

  @Column({ default: null })
  twitter: string;

  @Column({ default: null })
  facebook: string;

  @Column({ default: null })
  instagram: string;

  @Column({ default: null })
  github: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
