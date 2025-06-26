// base.dao.ts
import { Model } from 'mongoose';
import { UUIDTypes } from 'uuid';

export class BaseDao<T> {
    constructor(protected readonly model: Model<T>) { }

    async create(data: T,): Promise<T> {
        return await this.model.create(data);
    }

    async bulkCreate(dataArray: T[]): Promise<T[]> {
        return await this.model.insertMany(dataArray);
    }

    async getById(id: UUIDTypes): Promise<T | null> {
        return await this.model.findOne({ _id: id, deletedAt: null }) as T | null;
    }

    async updateById(id: UUIDTypes, data: Partial<T>): Promise<T | null> {
        return await this.model.findOneAndUpdate(
            { _id: id, deletedAt: null },
            data,
            { new: true }
        ) as T | null;
    }

    async getAll(): Promise<T[]> {
        return await this.model.find({ deletedAt: null }) as T[];
    }

    async deleteById(id: UUIDTypes): Promise<T | null> {
        return await this.model.findOneAndUpdate(
            { _id: id, deletedAt: null },
            { deletedAt: new Date() },
            { new: true }
        ) as T | null;
    }
}
