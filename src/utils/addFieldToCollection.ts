import mongoose, { Model } from "mongoose";

export const updateAddFieldCollection =
    async (Model: Model<any>, fieldName: string, fieldValue: any) => {
        try {
            // { $set: { role: new mongoose.Types.ObjectId("6445179decb7694e160bd533") } }
            const result = await Model.updateMany({}, { $set: { [fieldName]: fieldValue } })
            console.log("Result:", result);
        } catch (error) {
            console.log("Error", error)
        }
    }