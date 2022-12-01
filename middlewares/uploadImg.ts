import { NextFunction, Request, Response } from 'express'
import * as fs from "fs";
import multer from 'multer'
import path from 'path'
const { v4: uuid } = require("uuid");
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { reportError, getErrorMessage } from '../helpers/errorReport';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.ST_BUCKET,
    messagingSenderId: process.env.MSG_SENDER_ID,
    appId: process.env.APP_ID
};

const appFire = initializeApp(firebaseConfig);
const storageFire = getStorage(appFire);
const profilePicsRef = ref(storageFire, 'images/profilepics');
const productPicsRef = ref(storageFire, 'images/productpics');

export const uploadFire = async (req: Request, file: Response, next: NextFunction) => {
    try {
        const filenames = file.req.files as Array<Express.Multer.File>
        const values = Object.values(filenames)

        if (values.length < 1) {
            throw new Error('Only .png, .svg, .webp, .jpg and .jpeg format allowed or file missing')
        }

        const data = Object.values(values)
        const result = Object.keys(data).map((key: any) => [Number(key), data[key]]);
        const result2: Array<any> = Array(result)
        const elementArr = result2[0][0][1]

        const localPath: Array<any> = []

        for (let index = 0; index < elementArr.length; index++) {
            localPath.push(elementArr[index].path);
        }

        const uploader = []
        for (let index = 0; index < elementArr.length; index++) {
            const finalRef = elementArr[index].fieldname === 'profilePic' ? profilePicsRef : productPicsRef
            const spaceRef2 = ref(finalRef, elementArr[index].filename);
            let metadata = {
                contentType: elementArr[index].mimetype
            }
            uploader.push(uploadBytes(spaceRef2, fs.readFileSync(localPath[index]), metadata))
        }
        const urls: Promise<string | void>[] = []
        const picsArr: Array<any> = []
        Promise.all(uploader)
            .then(snapshot => {
                snapshot.map(
                    (snap) => {
                        urls.push(getDownloadURL(snap.ref)
                            .then((downloadURL: string) => {
                                picsArr.push(downloadURL);
                            }))
                    });
            })
            .then(() => {
                Promise.all(urls)
                    .then((result) => {
                        req.body.pics = picsArr;
                        localPath.forEach((item) => {
                            fs.unlink(item, (err) => {
                                console.log('Deleted: ', item);
                            })
                        })
                        next()
                    })
            });
    } catch (error) {
        file.status(400).json(reportError({ message: getErrorMessage(error) }))
    }
};

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, callback: DestinationCallback) {
        callback(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req: Request, file: Express.Multer.File, callback: FileNameCallback) {
        const destFilename = uuid() + path.extname(file.originalname);
        callback(null, destFilename,);
    }
});

export const uploadLocalSingle = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        if (
            file.mimetype == "image/png"
            || file.mimetype == "image/jpg"
            || file.mimetype == "image/jpeg"
            || file.mimetype == "image/svg+xml"
            || file.mimetype == "image/webp"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}).fields(
    [
        { name: 'profilePic', maxCount: 1 },
        { name: 'productPic', maxCount: 8 }
    ]
)
export const checkMultipart = async (req: Request, file: Response, next: NextFunction) => {
    console.log("file.req ", req.headers);
    if (file.req.headers["content-type"] !== 'application/x-www-form-urlencoded') {
        await uploadLocalSingle(req, file, function (err) {
            if (err) {
                console.log(err);

                return file.status(400).json(reportError({ message: getErrorMessage(err) }))
            }
            next()
        })
    }
    if (file.req.headers["content-type"] === 'application/x-www-form-urlencoded') {
        next()
    }
}

export const handleUploadFirebase = (req: Request, file: Response, next: NextFunction) => {
    if (file.req.headers["content-type"] !== 'application/x-www-form-urlencoded') {
        uploadFire(req, file, next)
    }
    if (file.req.headers["content-type"] === 'application/x-www-form-urlencoded') {
        next()
    }
}
