import { Response, Request, NextFunction } from "express";
export const handleError = (res: Response) => {
    return (err: string) => {
        res.status(404).json({ err });
        return;
    };
};

export const respondSuccess = (res: Response, blacklist: Array<String> = []) => {
    return (data: any) => {
        res.status(200).json(data);
        return;
    };
};

export const respond500 = (res: Response, blacklist: Array<String> = []) => {
    return (err: string) => {
        res.status(500).json({ err });
        return;
    };
};