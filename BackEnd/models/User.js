class User{
    constructor(id,nom,prenom,email,mdp,type,parent_valide,categorie){
        this.id=id;
        this.nom=nom;
        this.prenom=prenom;
        this.email=email;
        this.mdp=mdp;
        this.type=type;
        this.parent_valide=parent_valide;
        this.categorie=categorie
    }
}

module.exports=User;