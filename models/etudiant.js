const Joi = require('joi');

let etudiant_schema = Joi.object({
    id : Joi.number().integer().positive(),
    nom : Joi.string().min(5).max(50).required(),
    moyenne : Joi.number().integer().positive(),
    classe : Joi.string().alphanum().min(3).max(10).required(),
    modules:({
        module : Joi.string().alphanum().min(3).max(10),
        note : Joi.number().integer().positive(),
    })
});
let etudiant_update_schema = Joi.object({
    id : Joi.number().integer().positive(),
    nom : Joi.string().min(5).max(50).required(),
    moyenne : Joi.number().integer().positive(),
    classe : Joi.string().alphanum().min(3).max(10).required(),
    modules:({
        module : Joi.string().alphanum().min(3).max(10),
        note : Joi.number().integer().positive(),
    })
});

function etudiant_post_validation(obj,res) {
    let valid_res = etudiant_schema.validate(obj);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.message);
}
function seek_etudiant(etudiants,id,res) {
    let etudiant = etudiants.find(std=>std.id === parseInt(id));
    if(!etudiant)
        return res.status(404).send('Etudiant with the given id not found.');
    return etudiant;
}
function etudiant_update_validation(obj,res) {
    let valid_res = etudiant_update_schema.validate(obj);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.message);
}
module.exports.seek_etudiant =seek_etudiant;
module.exports.etudiant_post_validation=etudiant_post_validation;
module.exports.etudiant_update_validation=etudiant_update_validation;
