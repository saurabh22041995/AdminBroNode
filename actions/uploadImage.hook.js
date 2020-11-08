const AdminBro = require('admin-bro');
const fs = require('fs');
const path = require('path');


const after = async (response, request, context) => {
    console.log('In After uploadImage');
    const { record, uploadImage, secondImage } = context
    if (record.isValid() && uploadImage) {
        const filePath = path.join('uploads', record.id().toString(), uploadImage.name);
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.rename(uploadImage.path, filePath);

        await record.update({ uploadImage: `/${filePath}` });
    }
    if (record.isValid() && secondImage) {
        const filePath = path.join('uploads', record.id().toString(), secondImage.name);
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.rename(secondImage.path, filePath);

        await record.update({ secondImage: `/${filePath}` });
    }
    return response;
}

const before = async (request, context) => {
    console.log('In before uploadImage');
    if (request.method === 'post') {
        const { uploadImage, secondImage, ...otherParams } = request.payload;
        if (uploadImage) {
            context.uploadImage = uploadImage;
        }
        if (secondImage) {
            context.secondImage = secondImage;
        }
        return {
            ...request,
            payload: otherParams,
        }
    }
    return request;
};

module.exports = { after, before };
