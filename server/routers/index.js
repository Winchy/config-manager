module.exports = (router) => {
    router.get("/",
        /**
         * @param {object} req
         * @param {object} res
         */
        (req, res) => {
            res.end("index");
        },
    );

    router.get("/:collection/:collectionId", (req, res) => {
        console.log(req.params);
        let {collection, collectionId} = req.params;
        console.log(collection, collectionId)
        res.end(collection + '&&' + collectionId)
    })

    router.get('/templates', (req, res) => {
        res.json([{a: 1, b: 2}, {}]);
    })
};