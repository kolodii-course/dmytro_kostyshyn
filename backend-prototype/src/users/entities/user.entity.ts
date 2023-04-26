import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ uniqueItems: true })
  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @ApiProperty({ enum: UserRole, default: UserRole.User })
  @Column({ enum: UserRole, default: UserRole.User })
  role?: UserRole;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;
}
