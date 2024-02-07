const fs
    = require('node:fs');

class controller {
    async setData(req, res, next) {
        try {
            const data = String(req.body.data)

           await  fs.promises.writeFile('./data.txt', data);
            return res.json({})
        } catch (e) {
            next(e)
        }
    }

    async getData(req, res, next) {
        try {
            let data = undefined;
            data = await fs.promises.readFile('./data.txt', 'utf8');
            return res.json({ data: data });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new controller()