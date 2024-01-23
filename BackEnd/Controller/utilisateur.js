const Utilisateur = require('../models/Utilisateur');

exports.createUtilisateur = (req, res, next) => {
    delete req.body._id;
    const utilisateur = new Utilisateur({
      ...req.body
    });
    Utilisateur.save()
      .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.modifyUtilisateur = (req, res, next) => {
    Utilisateur.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.getOneUtilisateur=  (req, res, next) => {
    Utilisateur.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  }

  exports.deleteUtilisateur= (req, res, next) => {
    Utilisateur.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.getAllUtilisateur = (req, res, next) => {
    Utilisateur.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
  exports.login=(req,res,next)=>{

  }