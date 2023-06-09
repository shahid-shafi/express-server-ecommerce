import { Request } from "express";

export const queryBuilder = (req: Request) => {
    if (!Object.keys(req.query).length) return req.query;

    const { age, price, stock } = req.query;

    let query: any = {};

    if (age || price || stock) {
        query = req.query;
    } else {
        const [[key, value]] = Object.entries(req.query);
        let [field, operator] = key.split('_');
        operator = `$${operator}`;
        query = { [field]: { [operator]: parseInt(value.toString()) } };
    };
    return query;
}