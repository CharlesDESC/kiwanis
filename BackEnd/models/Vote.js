class Vote{
    constructor(id, utilisateur_Id, photo_Id,date_de_vote){
        this.id=id;
        this.utilisateur_Id=utilisateur_Id;
        this.photo_Id=photo_Id,
        this.date_de_vote=date_de_vote
    }
}

module.exports=Vote;