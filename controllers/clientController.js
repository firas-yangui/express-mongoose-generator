var clientModel = require('../models/clientModel.js');

/**
 * clientController.js
 *
 * @description :: Server-side logic for managing clients.
 */
module.exports = {

    /**
     * clientController.list()
     */
    list: function (req, res) {
        clientModel.find(function (err, clients) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting client.',
                    error: err
                });
            }
            return res.json(clients);
        });
    },

    /**
     * clientController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        clientModel.findOne({_id: id}, function (err, client) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting client.',
                    error: err
                });
            }
            if (!client) {
                return res.status(404).json({
                    message: 'No such client'
                });
            }
            return res.json(client);
        });
    },

    /**
     * clientController.create()
     */
    create: function (req, res) {
        var client = new clientModel({
			reference : req.body.reference

        });

        client.save(function (err, client) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating client',
                    error: err
                });
            }
            return res.status(201).json(client);
        });
    },

    /**
     * clientController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        clientModel.findOne({_id: id}, function (err, client) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting client',
                    error: err
                });
            }
            if (!client) {
                return res.status(404).json({
                    message: 'No such client'
                });
            }

            client.reference = req.body.reference ? req.body.reference : client.reference;

            client.save(function (err, client) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating client.',
                        error: err
                    });
                }

                return res.json(client);
            });
        });
    },

    /**
     * clientController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        clientModel.findByIdAndRemove(id, function (err, client) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the client.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
