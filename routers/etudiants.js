const express = require('express')
const router = express.Router();
const etudiant_valid = require('../models/etudiant');
const etudiants = [
    { id: 1, nom: 'John Doe', classe : "GLSI",
     modules: [{ module: 'Spring', note: 14 }, { module: 'Angular', note: 18 }] ,moyenne : 14},
    { id: 2, nom: 'jane doe', classe : "GLSI",
     modules: [{ module: 'Agile', note: 12 }, { module: '.Net', note: 10 }],moyenne : 10 }
  ];
  //calcul moyenne de chauque etudiant automatiquement
  function calculeMoyenne(modules) {
    let somme = 0;
    modules.forEach(module => {
      somme += module.note;
    });
    return somme / modules.length;
  }


  // Endpoint pour afficher les meilleures et les moins bons modules pour chaque étudiant
   router.get('/Max_Min_Module/:stdId',(req,res)=>{
    let etudiant = etudiant_valid.seek_etudiant(etudiants,req.params.stdId,res);
    const meilleurModule = etudiant.modules.reduce((prev, current) => (prev.note > current.note) ? prev : current);
    const moinsBonModule = etudiant.modules.reduce((prev, current) => (prev.note < current.note) ? prev : current);
   res.send({
    nom: etudiant.nom,
    classe: etudiant.classe,
    meilleurModule: meilleurModule.module,
    moinsBonModule: moinsBonModule.module,
 
});
})
//const noteMax = Math.max(etudiant.modules.map(module => module.note));


    /// calculer la moyenne des étudiants
router.get('/moyenne', (req, res) => {
    let total = 0;
    let count = 0;
    etudiants.forEach(etudiant => {
        total += etudiant.moyenne;
        count++;
      });
    
      const moyenne = total / count;
      res.json({ moyenne });
    });
 

  //Get all etudiants
  router.get('',(req,res)=>{
    res.send(etudiants);
})
//Get etudiant byI D
router.get('/:stdId',(req,res)=>{
    let etudiant = etudiant_valid.seek_etudiant(etudiants,req.params.stdId,res);
    res.send(etudiant);
})
router.use(express.json());

router.post('', (req, res) => {
    etudiant_valid.etudiant_post_validation(req.body,res);
  // Ajouter le nouvel étudiant à la liste des étudiants
    let etudiant = {
        id : etudiants.length + 1,
        nom : req.body.nom,
        classe : req.body.classe,
        modules : req.body.modules,
        moyenne: calculeMoyenne(req.body.modules)
        
    };
   
    etudiants.push(etudiant);
    res.status(201).send(etudiant);
});
// update etudiant
router.put('/:stdId',(req,res)=>{
    etudiant_valid.etudiant_update_validation(req.body,res);
    let etudiant = etudiant_valid.seek_etudiant(etudiants,req.params.stdId,res);

    if(req.body.nom)
        etudiant.nom= req.body.nom;
    if(req.body.classe)
        etudiant.classe = req.body.classe;
        if(req.body.modules)
        etudiant.modules = req.body.modules;
        if(req.body.moyenne)
        etudiant.moyenne= req.body.moyenne;
    res.status(202).send(etudiant);
})

//delete etudiant
router.delete('/:stdId',(req,res)=>{
    let etudiant = etudiant_valid.seek_etudiant(etudiants,req.params.stdId,res);
    etudiants = etudiants.filter(std=>std.id !== parseInt(req.params.stdId));
    res.status(202).send(etudiant);
})

module.exports = router;