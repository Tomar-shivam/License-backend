
import { NextFunction, Response } from 'express';
import { BaseController } from "../basecontroller";
import { IFilteredRequest } from "../../interfaces";
import { ApiPath, SwaggerDefinitionConstant, ApiOperationGet } from "swagger-express-ts"
import { vmUniqueIDService } from "../../services/trackingServices/vmUniqueIDServices";
import fs from 'fs'

@ApiPath({
    path: "/api",
    name: "Virtual Machine UniqueId",
    security: { apiKeyHeader: [] },
})

class VmUniqueIDControler extends BaseController {

    @ApiOperationGet({
        description: "Api to get UniqueID of Vm",
        path: '/uniqueid',
        summary: "Api to geta UniqueID of Vm",
        responses: {
            200: {
                description: "Success",
                type: SwaggerDefinitionConstant.Response.Type.OBJECT,
            },
            404: {
                description: "Fail",
                type: SwaggerDefinitionConstant.Response.Type.OBJECT,
            }
        },
    })

    public async getUniqueID(req: IFilteredRequest, res: Response, next: NextFunction) {
        try {
            const requestResult = await vmUniqueIDService.getUniqueID(req.body);
            return res.send(requestResult);
        } catch (error) {
            return null;
        }
    }

    public async createLicenseFile(req: IFilteredRequest, res: Response, next: NextFunction) {
        try {
            return await vmUniqueIDService.createLicenseFile(req.body, res);
        } catch (error) {
            return null;
        }
    }
    public async downloadLicenseFile(req: IFilteredRequest<any>, res: Response, next: NextFunction) {
        try {
            let checkMibFile = fs.existsSync(process.cwd() + "/license/licensefile.txt")
            if (checkMibFile) {
                return await vmUniqueIDService.downloadLicenseFile(req, res);
            } else {
                return res.send(null);
            }
        } catch (error) {
            return res.send(null);
        }
    }

    public async DeleteFile(req: IFilteredRequest, res: Response, next: NextFunction) {
        try {
            const requestResult = await vmUniqueIDService.DeleteFile(req.body);
            return res.send(requestResult);
        } catch (error) {
            return null;
        }
    }

}

export const vmUniqueIDControler = new VmUniqueIDControler();
