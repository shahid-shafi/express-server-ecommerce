"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddFieldCollection = void 0;
const updateAddFieldCollection = async (Model, fieldName, fieldValue) => {
    try {
        // { $set: { role: new mongoose.Types.ObjectId("6445179decb7694e160bd533") } }
        const result = await Model.updateMany({}, { $set: { [fieldName]: fieldValue } });
        console.log("Result:", result);
    }
    catch (error) {
        console.log("Error", error);
    }
};
exports.updateAddFieldCollection = updateAddFieldCollection;
