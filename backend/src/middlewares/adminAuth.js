const jwt = require('jsonwebtoken');
const config = require('config');
const {Admin} = require('../models/admin');

module.exports = function (permission){
    return function (req, res, next) {
        const token = req.cookies['x-auth-token'];

        if (!token) {
            return res.sendStatus(401); // Unauthorized
        }

        jwt.verify(token, config.get('jwtPrivateKey'), async (err, admin) => {
            if (err) {

            }
            req.admin = admin;

            if (permission) {
                const admin = await Admin.findByPk(req.admin.id);
                const role = await admin.getRoles();
                let permissions = await role.getPermissions();
                permissions = permissions.map((p) => p.name);
                if(permissions.includes(permission) || permissions.includes('ALL_' + permission.split('_')[1])) next();
                else
                    return res.sendStatus(403); // Forbidden
            }
            else next();
        });
    }
}
