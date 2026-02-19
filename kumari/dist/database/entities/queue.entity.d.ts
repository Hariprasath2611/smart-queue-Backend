import { BaseEntity } from './base.entity';
import { Service } from './service.entity';
import { Token } from './token.entity';
export declare class Queue extends BaseEntity {
    date: Date;
    isActive: boolean;
    service: Service;
    tokens: Token[];
}
