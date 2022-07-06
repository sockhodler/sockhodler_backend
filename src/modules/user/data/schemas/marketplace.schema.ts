import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Marketplace {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    unitName: string;
  
    @Column()
    creator: string;

    @Column()
    index: number;
  
    @Column()
    amount: number;

    @Column()
    total: number;

    @Column()
    decimals: number;

    @Column()
    url: string;

    @Column()
    algoPrice: number;

    @Column()
    socksPrice: number;

    @Column()
    royalty: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  