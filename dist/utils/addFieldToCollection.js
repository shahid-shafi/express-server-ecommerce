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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddFieldCollection = void 0;
const updateAddFieldCollection = (Model, fieldName, fieldValue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // { $set: { role: new mongoose.Types.ObjectId("6445179decb7694e160bd533") } }
        const result = yield Model.updateMany({}, { $set: { [fieldName]: fieldValue } });
        console.log("Result:", result);
    }
    catch (error) {
        console.log("Error", error);
    }
});
exports.updateAddFieldCollection = updateAddFieldCollection;
