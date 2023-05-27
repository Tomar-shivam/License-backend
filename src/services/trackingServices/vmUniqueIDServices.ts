const fsRead = require('fs/promises');
import fs from 'fs'
import crypto from 'crypto';
import path from "path";
const key = 'RCClicence';
const iv = crypto.randomBytes(16);

class VmUniqueIDService {

    public getUniqueID = async (req?: any) => {
        let resObj = {};
        try {
            const data = await fsRead.readFile("/etc/machine-id", { encoding: 'utf8' });
            let enc = await this.EncryptingId(data.split("\n")[0])
            let dec = await this.DecryptingID(enc)

            resObj["ack"] = "1";
            resObj["UniqueID"] = data.split("\n")[0];
            resObj["EncryptedID"] = enc;
            resObj["DecryptedID"] = dec;
        } catch (err) {
            resObj["ack"] = "1";
            resObj["ID"] = "Id not found";
        }
        return resObj;
    }

    public EncryptingId = async (id) => {
        let cipher = crypto.createCipher('aes256', key);
        let encrypted = cipher.update(id, 'utf8', 'hex') + cipher.final('hex');
        return encrypted;
    }

    public DecryptingID = async (id) => {
        let decipher = crypto.createDecipher('aes256', key);
        let decrypted = decipher.update(id, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
    }

    public createLicenseFile = async (req?: any, res?: any) => {
        let resObj = {};
        try {
            let licenceToken = req.licenceID + "_" + req.numberOfLicence + "_" + req.startDate + "_" + req.expiryDate
            let encLicenceToken = await this.EncryptingId(licenceToken)
            let checkFirmwareFile = fs.existsSync(process.cwd() + "/license")
            if (checkFirmwareFile) {
                await fsRead.writeFile(process.cwd() + "/license/licensefile.txt", encLicenceToken, { encoding: 'utf8' })
            } else {
                fs.mkdirSync(path.join(process.cwd(), "license"));
                await fsRead.writeFile(process.cwd() + "/license/licensefile.txt", encLicenceToken, { encoding: 'utf8' })
            }
            return this.downloadLicenseFile(req, res)
        } catch (err) {
            resObj["ack"] = "0";
            resObj["ID"] = "File Note created";
        }
    }

    public downloadLicenseFile = async (req?: any, res?: any) => {
        try {
            const response = res.download(process.cwd() + "/license/licensefile.txt", `Licenc.txt`, err => {
                if (err) return err;
            }).catch(err => {
                console.log(err);
            });
            return response;
        } catch (error) {
            return { err: error };
        }
    }

    public DeleteFile = async (req?: any, res?: any) => {
        try {
            let filePath = process.cwd() + "/license/licensefile.txt";
            fs.unlinkSync(filePath);
        } catch (error) {
            return { err: error };
        }
    }

}

export const vmUniqueIDService = new VmUniqueIDService();