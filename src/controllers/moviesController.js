const db = require('../database/models');
const moment = require('moment');
const { validationResult } = require('express-validator');

//Otra forma de llamar a los modelos

const moviesController = {
    list: (req, res) => {
        db.Movie.findAll().then((movies) => {
            res.render('moviesList.ejs', { movies });
        });
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id).then((movie) => {
            res.render('moviesDetail.ejs', { movie });
        });
    },
    new: (req, res) => {
        db.Movie.findAll({
            order: [['release_date', 'DESC']],
            limit: 5,
        }).then((movies) => {
            res.render('newestMovies', { movies });
        });
    },
    recomended: (req, res) => {
        db.Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 },
            },
            order: [['rating', 'DESC']],
        }).then((movies) => {
            res.render('recommendedMovies.ejs', { movies });
        });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd');
    },
    create: function (req, res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Movie.create({
                ...req.body,
            })
                .then((result) => {
                    console.log(result);
                    res.redirect('/movies');
                })
                .catch((error) => console.log(error));
        } else {
            res.render('moviesAdd', {
                errores: errors.mapped(),
                old: req.body,
            });
        }
    },
    edit: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then((Movie) => {
                res.render('moviesEdit', {
                    Movie,
                    fecha: moment(Movie.release_date).format('YYYY-MM-DD'),
                });
            })
            .catch((error) => console.log(error));
    },
    update: function (req, res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Movie.update(
                {
                    ...req.body,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            )
                .then(() => { return res.redirect('/movies')})
                .catch((error) => console.log(error));
        } else {
            db.Movie.findByPk(req.params.id)
                .then(Movie =>{
                    res.render("moviesEdit",{
                        errores : errors.mapped(),
                        old : req.body,
                        Movie ,
                fecha: moment(Movie.release_date).format('YYYY-MM-DD'),
            });
        })
    }
},
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then((Movie) => {
                res.render('moviesDelete', {
                    Movie,
                });
            })
            .catch((error) => console.log(error));
    },
    destroy: function (req, res) {
        db.Movie.destroy({
            where: {
                id: req.params.id,
            },
        }).catch((error) => console.log(error));
        res.redirect('/movies');
    },
};

module.exports = moviesController;
