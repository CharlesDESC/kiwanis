class Photo{
    constructor(id, image_url, format, date_de_post, utilisateur_Id){
        this.id=id;
        this.image_url=image_url;
        this.format=format;
        this.date_de_post=date_de_post;
        this.utilisateur_Id=utilisateur_Id
    }
}

module.exports=Photo;