import catchAsync from '../../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import AppError from '../../utils/appError';
import { globalMessages, responseMessage } from '../../utils/appMessageHandler';

export const createOne = (Model: Model<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const document = await Model.create(req.body);
        res.status(201).json({
            status: true,
            message: globalMessages?.createOne[req?.url],
            data: document,
        });
    });

export const getOne = (Model: Model<any>, populateOptions: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // let query = await Model.findById(req.params.id).populate('review'); //: example  
        let query = await Model.findById(req.params.id);
        if (populateOptions) query = query.populate(populateOptions);

        const document = await query;

        if (!document) {
            return next(new AppError('No document found with that Id', 404));
        }

        res.status(201).json({
            status: true,
            message: responseMessage(req, 'getOne') || '',
            data: document,
        });
    });

export const getAll = (Model: Model<any>, populateOptions: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // const documents = await Model.find().populate(populateOptions);
        const documents = await Model.find();

        if (!documents.length) {
            return next(new AppError('No documents found', 404));
        }

        res.status(200).json({
            status: true,
            items: documents?.length,
            message: globalMessages?.getAll[req?.url],
            data: documents,
        });
    });

export const deleteOne = (Model: Model<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const document = await Model.findByIdAndDelete(req.params.id);

        if (!document) {
            return next(new AppError('No document found with that id', 404));
        }

        res.status(202).json({
            status: true,
            message: responseMessage(req, 'deleteOne') || '',
            data: null,
        });
    });


export const updateOne = (Model: Model<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!document) {
            next(new AppError('No document found with that id', 404));
        }

        res.status(201).json({
            status: true,
            message: responseMessage(req, 'updateOne') || '',
            data: document,
        });
    })

export const updateAll = (Model: Model<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { field, value } = req.body;

        const documents = await Model.updateMany({}, { $set: { [field]: value } });

        res.status(200).json({
            result: 'success',
            message: `Documents Updated successfully`,
            data: documents
        })
    })

export const updateSome = (Model: Model<any>) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { field, value, commonField, commonValue } = req.body;

        const filter: { [key: string]: any } = {};
        filter[commonField] = commonValue;

        const update: { $set: { [key: string]: any } } = { $set: {} };
        update.$set[field] = value;

        const documents = await Model.updateMany(filter, update);

        res.status(200).json({
            result: 'success',
            message: `Documents Updated successfully`,
            data: documents
        });
    });
