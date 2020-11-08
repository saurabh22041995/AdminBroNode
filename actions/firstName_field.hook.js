const AdminBro = require('admin-bro');
// const fs = require('fs');
// const path = require('path');


const after = async (response, request, context) => {
    console.log('In After');
    const { record, uploadImage } = context
    if (record.isValid() && uploadImage) {
        const filePath = path.join('uploads', record.id().toString(), uploadImage.name);
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

        await fs.promises.rename(uploadImage.path, filePath);

        await record.update({ uploadImage: `/${filePath}` });
    }
    return response;
}

const before = async (request, context) => {
    console.log('In before', request);
    console.log('In before', context.firstName);
    if (request.method === 'post') {
        const { firstName, ...otherParams } = request.payload;
        context.firstName = firstName;

        return {
            ...request,
            payload: request.payload,
        };
    }
    return request;
};

module.exports = { after, before };
