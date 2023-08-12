"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSome = exports.updateAll = exports.updateOne = exports.deleteOne = exports.getAll = exports.getOne = exports.createOne = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const appError_1 = __importDefault(require("../../utils/appError"));
const appMessageHandler_1 = require("../../utils/appMessageHandler");
const createOne = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield Model.create(req.body);
    res.status(201).json({
        status: true,
        message: appMessageHandler_1.globalMessages === null || appMessageHandler_1.globalMessages === void 0 ? void 0 : appMessageHandler_1.globalMessages.createOne[req === null || req === void 0 ? void 0 : req.url],
        data: document,
    });
}));
exports.createOne = createOne;
const getOne = (Model, populateOptions) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // let query = await Model.findById(req.params.id).populate('review'); //: example  
    let query = yield Model.findById(req.params.id);
    if (populateOptions)
        query = query.populate(populateOptions);
    const document = yield query;
    if (!document) {
        return next(new appError_1.default('No document found with that Id', 404));
    }
    res.status(201).json({
        status: true,
        message: (0, appMessageHandler_1.responseMessage)(req, 'getOne') || '',
        data: document,
    });
}));
exports.getOne = getOne;
const getAll = (Model, populateOptions) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, req.query);
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    // const documents = await Model.find().populate(populateOptions);
    const documents = yield Model.find();
    if (!documents.length) {
        return next(new appError_1.default('No documents found', 404));
    }
    res.status(200).json({
        status: true,
        items: documents === null || documents === void 0 ? void 0 : documents.length,
        message: appMessageHandler_1.globalMessages === null || appMessageHandler_1.globalMessages === void 0 ? void 0 : appMessageHandler_1.globalMessages.getAll[req === null || req === void 0 ? void 0 : req.url],
        data: documents,
    });
}));
exports.getAll = getAll;
const deleteOne = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield Model.findByIdAndDelete(req.params.id);
    if (!document) {
        return next(new appError_1.default('No document found with that id', 404));
    }
    res.status(202).json({
        status: true,
        message: (0, appMessageHandler_1.responseMessage)(req, 'deleteOne') || '',
        data: null,
    });
}));
exports.deleteOne = deleteOne;
const updateOne = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!document) {
        next(new appError_1.default('No document found with that id', 404));
    }
    res.status(201).json({
        status: true,
        message: (0, appMessageHandler_1.responseMessage)(req, 'updateOne') || '',
        data: document,
    });
}));
exports.updateOne = updateOne;
const updateAll = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { field, value } = req.body;
    const documents = yield Model.updateMany({}, { $set: { [field]: value } });
    res.status(200).json({
        result: 'success',
        message: `Documents Updated successfully`,
        data: documents
    });
}));
exports.updateAll = updateAll;
const updateSome = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { field, value, commonField, commonValue } = req.body;
    const filter = {};
    filter[commonField] = commonValue;
    const update = { $set: {} };
    update.$set[field] = value;
    const documents = yield Model.updateMany(filter, update);
    res.status(200).json({
        result: 'success',
        message: `Documents Updated successfully`,
        data: documents
    });
}));
exports.updateSome = updateSome;
