import S3 from 'aws-sdk/clients/s3';

// Put your storage credentials here:
export const bucket = process.env.bucket;
const region = process.env.region;
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
export const s3 = new S3({ region, accessKeyId, secretAccessKey });

export async function uploadToS3(body, id, headers) {
    await s3.upload({
        Bucket: bucket,
        Body: body,
        Key: id,
        ContentType: headers
    }).promise();
}
export async function deleteAllFromS3(result): Promise<string[]> {
    return new Promise(async (res, rej) => {
        let deletedKeys: string[] = []
        if (result.rowCount > 0) {
            for (const row of result.rows) {
                const id = row.id;
                await s3.deleteObjects({
                    Bucket: bucket,
                    Delete: { Objects: [{ Key: id }] }
                }).promise().then(obj => deletedKeys.push(obj.Deleted![0].Key!)).catch();
            }
        }
        res(deletedKeys)
    })
}

export async function deleteOneFromS3(result) {
    if (result.rowCount > 0) {
        for (const row of result.rows) {
            const id = row.id;
            s3.deleteObjects({
                Bucket: bucket,
                Delete: { Objects: [{ Key: id }] }
            });
        }
    }
}

export async function getImgFromS3(result, id) {
    if (result.rowCount > 0) {
        const data = await s3.getObject({
            Key: id,
            Bucket: bucket
        }).promise();
        return data;
    }
}

export async function getSizeFromS3(result, id) {
    if (result.rowCount > 0) {
        const data = await s3.getObject({
            Key: id,
            Bucket: bucket
        }).promise();
        return data;
    }
}