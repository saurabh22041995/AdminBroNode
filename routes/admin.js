const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequalize = require('@admin-bro/sequelize');
const sequelize = require('../utils/database');
const Place = require('../models/place');
const User = require('../models/user');

const {
    after: uploadAfterHook,
    before: uploadBeforeHook
} = require('../actions/uploadImage.hook');

const {
    after: firstAfterHook,
    before: firstBeforeHook
} = require('../actions/firstName_field.hook');

const { request } = require('http');

AdminBro.registerAdapter(AdminBroSequalize);

const adminBro = new AdminBro({
    databases: [sequelize],
    resources: [
        {
            resource: User,
            options:
            {
                parent:
                {
                    name: 'User Content',
                    icon: 'fas fa-cogs'
                },
                properties:
                {
                    uploadImage:
                    {
                        components:
                        {
                            edit: AdminBro.bundle('../components/upload-image.jsx')
                        }
                    },
                    firstName:
                    {
                        components:
                        {
                            edit: AdminBro.bundle('../components/firstName_field.jsx')
                        }
                    },
                    secondImage:
                    {
                        components:
                        {
                            edit: AdminBro.bundle('../components/secondImage.jsx')
                        }
                    }
                },

                actions:
                {
                    new:
                    {
                        after: async (response, request, context) => await uploadAfterHook(response, request, context),
                        before: async (response, request, context) => await uploadBeforeHook(response, request, context)
                    },
                    edit:
                    {
                        after: async (response, request, context) => await firstAfterHook(response, request, context),
                        before: async (response, request, context) => await firstBeforeHook(response, request, context)
                    }
                },
            }
        },
        {
            resource: Place,
            options:
            {
                parent:
                {
                    name: 'Place Content',
                    icon: 'fas fa-cogs'
                },
            }
        }
    ],
    branding: {
        companyName: 'knitPro',
        softwareBrothers: false
    },
    rootpath: '/admin'



})

const router = AdminBroExpress.buildRouter(adminBro);


module.exports = router;
