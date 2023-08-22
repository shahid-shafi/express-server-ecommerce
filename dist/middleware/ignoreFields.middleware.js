"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignoreFields = void 0;
const ignoreFields = (ignoredFields) => (req, res, next) => {
    var _a;
    const modifiedBody = Object.fromEntries((_a = Object.entries(req.body)) === null || _a === void 0 ? void 0 : _a.filter(([key]) => !(ignoredFields === null || ignoredFields === void 0 ? void 0 : ignoredFields.includes(key))));
    req.body = modifiedBody;
    next();
};
exports.ignoreFields = ignoreFields;
