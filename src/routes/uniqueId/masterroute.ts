import express, { NextFunction, Request, Response } from "express";
import { BaseRoutes } from "../baseroutes";
import cores from "cors";
import path from "path";
import { vmUniqueIDControler } from '../../controllers/vmUniqueIdControler/vmUniqueIdController';

class MasterRouteV1 extends BaseRoutes {
    public path = "/";

    constructor() {
        super();
        this._configure();
    }

    /**
     * @description Connect routes to their matching controller endpoints.
     */
    private _configure() {
        this.router.use(cores());

        this.router.use(express.static(path.join(__dirname, "../../../build")));
        this.router.get('/', (req, res, next) => {
            res.sendFile(path.join(__dirname, "../../../build", "index.html"))
        })

        this.router.get('/uniqueid',
            (req: Request, res: Response, next: NextFunction) => {
                vmUniqueIDControler.getUniqueID(req, res, next);
            })

        this.router.post('/createlicence',
            (req: Request, res: Response, next: NextFunction) => {
                vmUniqueIDControler.createLicenseFile(req, res, next);
            })

        this.router.get('/downloadlicence',
            (req: Request, res: Response, next: NextFunction) => {
                vmUniqueIDControler.downloadLicenseFile(req, res, next);
            })

        this.router.post('/deletfile',
            (req: Request, res: Response, next: NextFunction) => {
                vmUniqueIDControler.DeleteFile(req, res, next);
            })
    }
}

export const masterRouteV1 = new MasterRouteV1();
