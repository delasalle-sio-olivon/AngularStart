import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
/**
 * Import model
 */
import { Composite } from '../../../model/Composite';
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';
import { Link } from '../../../model/Link';

/**
 * Import service
 */
import { CategorieProvider } from '../../../service/categorie.provider';
import { InformationProvider } from '../../../service/information.provider';
import { ServiceProvider } from '../../../service/service.provider';
import { Utils } from '../../../service/Utils';

@Injectable()
export class SauvegardeService {
    //liens entre catégories
    linksCat : any[];
    //liens entre informations
    linksInfo : any[];
    //toutes les catégories du portail
    categories : Categorie[];
    //toutes les informations du portail
    informations : Information[];
    //tous les élément du portail lié entre eux (c'est une catégorie fictive contenant les autres) => forme d'arbre
    tree : Categorie;
    //ancienne taille de dataLinks
    oldLinksCatLenght : number;
    //ancienne taille de dataLinksInfos
    oldLinksInfoLenght : number;
    //categories modifié
    categoriesToSave : Categorie[];
    //information modifié
    informationToSave : Information[];
    //liens de catégorie à ajouter
    linksCatToAdd : Link[];
    //liens de catégorie à supprimer
    linksCatToDel : Link[];
    //liens de information à ajouter
    linksInfoToAdd : Link[];
    //liens de information à supprimer
    linksInfoToDel : Link[];
    //true quand une sauvegarde c'est fini et bien déroulé
    saveEnded : boolean;
    //id que prendra la prochaine nouvelle catégorie
    newCatId : number;
    //id que prendra la prochaine nouvelle information
    newInfoId : number;
    //id des catégories à supprimer
    catDeleted : Categorie[];
    //id de l'information à supprimer
    infoDeleted : Information[];
    //
    imgsInfo : any[];

    constructor(private serviceCategorie : CategorieProvider, private serviceInformation : InformationProvider) {
        this.categoriesToSave = new Array();
        this.informationToSave = new Array();
        this.catDeleted = new Array();
        this.infoDeleted = new Array();
        this.imgsInfo = new Array();
        this.linksCatToAdd = new Array();
        this.linksCatToDel = new Array();
        this.linksInfoToAdd = new Array();
        this.linksInfoToDel = new Array();
        this.newCatId = -1;
        this.newInfoId = -1000;
     }

    /**
     * INITIALISATION
     */

    init(){
        let obs : Observable<any>[] = new Array();
        //on récupère les données
        obs.push(this.requestAllCat());
        obs.push(this.requestAllCategorieLinks());
        obs.push(this.requestAllInfo());
        obs.push(this.requestAllInformationsLinks());
        //quand les requètes sont toutes fini
        let ob = Observable.forkJoin(obs);
        ob.subscribe(value=>{
            //on initialise l'arbre
            this.tree = new Categorie("Invisble","Invisble", "Invisble", "Invisble");
            //on forme l'arbre via les données que l'on a récupéré
            this.formatDataAsTree();
        });
        return ob;
    }

    /**
     * Récupère toutes les catégories et les stock dans this.categories
     * @return Observable<Categorie[]> de la requète.
     */
    requestAllCat(){
        let response : Observable<Categorie[]> = this.serviceCategorie.getAllCategories();

        response.subscribe(cats=>{
            this.categories = cats;
        });

        return response;
    }

    requestAllCategorieLinks(){
        let response : Observable<Link[]> = this.serviceCategorie.getLinks();
        
        response.subscribe(links=>{
            this.linksCat = links;
        });

        return response;
    }

    requestAllInfo(){
        let response : Observable<Information[]> = this.serviceInformation.getAllInformations();

        response.subscribe(infos=>{
            this.informations = infos;
        });

        return response;
    }

    requestAllInformationsLinks(){
        let response : Observable<Link[]> = this.serviceInformation.getAllLinks();
        
        response.subscribe(links=>{
            this.linksInfo = links;
        });

        return response;
    }

    saveLinkCategorieLength(){
        this.oldLinksCatLenght = this.linksCat.length;
    }

    saveLinkInformationLength(){
        this.oldLinksInfoLenght = this.linksInfo.length;
    }

    saveLinksLength(){
        this.saveLinkCategorieLength();
        this.saveLinkInformationLength();
    }

    reloadTree(){
        this.formatDataAsTree();
    }

    /**
     * Lie les catégories entre elles (sous forme d'arbre)
     */
    formatDataAsTree(){
        //on récupère les catégories qui n'ont pas de parent (Normalment on ne veut récupérer que la catégorie "firstoffirst")
        let catInvisible : Categorie[] = this.getCategoriesWhithoutParents();

        //on intialise le tableau de catégorie de l'arbre
        this.tree.categories = new Array();
        
        //pour chaque catégorie on forme les branches de l'arbre
        catInvisible.forEach(cat=>{
            this.tree.categories.push(this.setupBranch(cat));
        });
        //si des infos n'ont pas de parents il faut quand même les afficher, on les récupère et on les met a la racine de l'arbre
        let infoInvisible : Information[] = this.informations.filter(info=>{
            let link = Link.findByIdEnfant(this.linksInfo, info.id);
            if(Utils.isUndefined(link)){
                if(Information.getInArrayById(this.infoDeleted, info.id) === null){
                    return true;
                }
            }
            return false;
        });
        this.tree.informations = infoInvisible;
    }
    /**
     * Recupère les enfant de la catégorie
     * @return Categorie avec ses enfants
     */
    setupBranch(value : Categorie) : Categorie{
        //on récupère les enfants
        let ret = this.dataChild(value);
        value.categories = ret.categories;
        value.informations = ret.informations;
        return value;
    }

    /**
     * Récupère les enfants de la catégorie
     * @return obj enfants : { categories: enfants, informations : infos }
     */
    dataChild(parent : Categorie) : any{
        let enfants : Categorie[] = new Array();
      
        //on récupère les liens avec une idParent égale à celle de parent 
        Link.filterByIdParent(this.linksCat, parent.id)
        //pour chaque lien 
        .forEach(link => {
            //on récupère la catégories enfant correspondante ainsi que ses enfants
            enfants.push(
            this.setupBranch(
                Categorie.getInArrayById(this.categories, link.idEnfant)
                )
            );
         });
        
        //on fait pareil pour les informations (mais elles n'ont pas d'enfant, on a juste a la récupérer)
        let infos : Information[] = new Array();
        Link.filterByIdParent(this.linksInfo, parent.id)
        .forEach(link => {
            infos.push(
                Information.getInArrayById(this.informations, link.idEnfant)
            );
        });
        
        return {categories: enfants, informations : infos};
    }

    getCategoriesWhithoutParents(){
        return this.categories.filter(cat=>{
            //si l'id de la catégorie est présente dans un lien en tant que idEnfant elle a un parent
            let link = this.linksCat.find(link=>{
            if(cat.id === link.idEnfant){
                return true;
            }
            return false;
            });
            //si link est undefined
            if(Utils.isUndefined(link)){
                //alors la cat n'a pas de parent
                //mais il ne faut pas l'afficher si c'est une catégorie supprimé
                if(Categorie.getInArrayById(this.catDeleted, cat.id) === null){
                    return true;
                }
            }
            //sinon elle en a
            return false;
        });
    }








    /**
     * TRAITEMENT LORS DES CHANGEMENTS
     */

    /**
     * Identifie la catégorie selectionné comme catégorie qui a été modifié
     */
    markCatAsChange(categorie : Categorie) : void{
      //on vérifie qu'elle n'est pas déjà identifié
      let index : number = this.categoriesToSave.indexOf(categorie);

      if(Utils.isUndefined(index) || index === -1){
        //elles ne sont pas identifié donc on peut les identifié
        this.categoriesToSave.push(categorie);
      }
    }

    /**
     * Identifie l'information selectionné comme information qui à été modifié
     */
    markInfoAsChange(information : Information){
      //on vérifie qu'elle n'est pas déjà identifié
      let index = this.informationToSave.indexOf(information);

      if(Utils.isUndefined(index) || index === -1){
        //elles ne sont pas identifié donc on peut les identifié
        this.informationToSave.push(information);
      }
    }

    /**
     * Creation d'une nouvelle catégorie
     */
    newCategorie() : Categorie {
      let categorie : Categorie = new Categorie("","","","",this.newCatId);
      //on décrémente l'id pour que la prochaine nouvelle catégorie n'ai pas le même identifiant que celle ci
      this.newCatId--;
      this.categories.push(categorie);
      //on rafraichi l'arbre pour qu'elle soit y soit visible
      this.reloadTree();
      return categorie;
    }

    /**
     * Creation d'une nouvelle information
     */
    newInformation() : Information {
      let information : Information = new Information("","","","",null, this.newInfoId);
      //on décrémente l'id pour que la prochaine nouvelle information n'ai pas le même identifiant que celle ci
      this.newInfoId--;
      this.informations.push(information);
      this.reloadTree();

      return information;
    }

    /**
     * Ajoute un lien à l'affichage et dans la mécanique de sauvegarde
     */
    addCatLink(link : Link) : void{
        //on regarde si le lien n'est pas présent dans ceux a supprimer
        let index = Link.findIndex(this.linksCatToDel,link);
        if(!Utils.isUndefined(index) && index !==-1){
            //si oui on l'enlève
            this.linksCatToDel.splice(index, 1);
        }
        //et si il n'est pas déjà dans les liens à ajouter on l'y ajoute
        index = Link.findIndex(this.linksCatToAdd,link);
        if(Utils.isUndefined(index) || index ===-1){
            this.linksCatToAdd.push(link);
        }

        //et si il n'est pas déjà dans les liens de l'arbre
        index = Link.findIndex(this.linksCat,link);
        if(Utils.isUndefined(index) || index ===-1){
            //on l'y ajoute
            this.linksCat.push(link);
            this.reloadTree();
        }

    }

    /**
     * Supprime un lien de categorie de l'affichage et dans la mécanique de sauvegarde
     */
    delCatLink(link : Link) : void{
        //on regarde si le lien n'est pas présent dans ceux a supprimer
        let index = Link.findIndex(this.linksCatToDel,link);
        if(Utils.isUndefined(index) || index ===-1){
            //si non on l'y ajoute
            this.linksCatToDel.push(link);
        }
        //et si il est dans les liens à ajouter
        index = Link.findIndex(this.linksCatToAdd,link);
        if(!Utils.isUndefined(index) && index !==-1){
            //on le supprime
            this.linksCatToAdd.splice(index,1);
        }

        //et si il n'est pas déjà dans les liens de l'arbre
        index = Link.findIndex(this.linksCat,link);
        if(!Utils.isUndefined(index) && index !==-1){
            //on le supprime
            this.linksCat.splice(index,1);
            this.reloadTree();
        }
    }

    /**
     * Ajoute un lien à l'affichage et dans la mécanique de sauvegarde
     */
    addInfoLink(link : Link) : void{
        //on regarde si le lien n'est pas présent dans ceux a supprimer
        let index = Link.findIndex(this.linksInfoToDel,link);
        if(!Utils.isUndefined(index) && index !==-1){
            //si oui on l'enlève
            this.linksInfoToDel.splice(index, 1);
        }
        //et si il n'est pas déjà dans les liens à ajouter on l'y ajoute
        index = Link.findIndex(this.linksInfoToAdd,link);
        if(Utils.isUndefined(index) || index ===-1){
            this.linksInfoToAdd.push(link);
        }

        //et si il n'est pas déjà dans les liens de l'arbre
        index = Link.findIndex(this.linksInfo,link);
        if(Utils.isUndefined(index) || index ===-1){
            //on l'y ajoute
            this.linksInfo.push(link);
            this.reloadTree();
        }

    }

    /**
     * Supprime un lien de categorie de l'affichage et dans la mécanique de sauvegarde
     */
    delInfoLink(link : Link) : void{
        //on regarde si le lien n'est pas présent dans ceux a supprimer
        let index = Link.findIndex(this.linksInfoToDel,link);
        if(Utils.isUndefined(index) || index ===-1){
            //si non on l'y ajoute
            this.linksInfoToDel.push(link);
        }
        //et si il est dans les liens à ajouter
        index = Link.findIndex(this.linksInfoToAdd,link);
        if(!Utils.isUndefined(index) && index !==-1){
            //on le supprime
            this.linksInfoToAdd.splice(index,1);
        }

        //et si il n'est pas déjà dans les liens de l'arbre
        index = Link.findIndex(this.linksInfo,link);
        if(!Utils.isUndefined(index) && index !==-1){
            //on le supprime
            this.linksInfo.splice(index,1);
            this.reloadTree();
        }
    }

    /**
     * Supprime une catégorie de l'affichage et dans la mécanique de sauvegarde
     */
    delCat(categorie : Categorie){
        //on sauvegarde le fait qu'on doit la supprimer lors de la sauvegarde
        this.catDeleted.push(categorie);
        
        //on récupère les liens à supprimer (tout ceux dans le quel la cat est présente)
        let linkCat = Link.filterById(this.linksCat, categorie.id);
        let linkInfo = Link.filterByIdParent(this.linksInfo, categorie.id);
        
        //on les ajoutes au lien de cat a supprimer
        this.linksCatToDel.concat(linkCat);
        this.linksInfoToDel.concat(linkInfo);
        
        //on supprime les liens dans l'affichage
        this.linksCat = Link.filterByNotId(this.linksCat, categorie.id);
        this.linksInfo = Link.filterByNotIdParent(this.linksInfo, categorie.id);

        this.reloadTree();
    }

    /**
     * Supprime une information de l'affichage et dans la mécanique de sauvegarde
     */
    delInfo(information : Information){
        //on sauvegarde le fait qu'on doit la supprimer lors de la sauvegarde
        this.infoDeleted.push(information);
        
        //on récupère les liens à supprimer (tout ceux dans le quel la cat est présente)
        let linkInfo = Link.filterByIdEnfant(this.linksInfo, information.id);
        
        //on les ajoutes au lien de cat a supprimer
        this.linksInfoToDel.concat(linkInfo);

        //on supprime les liens dans l'affichage
        this.linksInfo = Link.filterByNotIdEnfant(this.linksInfo, information.id);

        this.reloadTree();
    }




    /**
     * SAUVEGARDE
     */
    
    /**
     * Sauvegarde tous les changements
     */
    saveChanges() : void{
        
        if(this.categoriesToSave.length>0 || this.catDeleted.length>0 || this.infoDeleted.length>0 || this.informationToSave.length>0){

            this.saveInfoImg();

            let obs : Observable<any>[] = new Array();
            if(this.categoriesToSave.length>0 || this.catDeleted.length>0){
                obs.push(this.saveCategories());
            }
            if(this.infoDeleted.length>0 || this.informationToSave.length>0){
                obs.push(this.saveInformations());
            }
            Observable.forkJoin(obs).subscribe(res=>{
                this.catDeleted = new Array();
                this.infoDeleted = new Array();
                let obs2 = Array();

                if(this.linksCatToAdd.length>0 || this.linksCatToDel.length>0 || this.linksInfoToAdd.length>0 || this.linksInfoToDel.length>0){
                    obs2.push(this.saveLinks());
                }
                if(this.infoDeleted.length>0 || this.informationToSave.length>0){
                    obs2.push(this.saveInfoImg());
                }
                if(obs2.length>2){
                    Observable.forkJoin(obs2).subscribe(res=>{
                        this.linksInfoToAdd = new Array();
                        this.linksInfoToDel = new Array();
                        this.linksCatToAdd = new Array();
                        this.linksCatToDel = new Array();
                        this.saveEnd(true);
                    });
                }
            });
        }else{
            let obs2 = Array();

            if(this.linksCatToAdd.length>0 || this.linksCatToDel.length>0 || this.linksInfoToAdd.length>0 || this.linksInfoToDel.length>0){
                obs2.push(this.saveLinks());
            }
            if(this.imgsInfo.length>0 || this.imgsInfo.length>0){
                obs2.push(this.saveInfoImg());
            }
            if(obs2.length>0){
                Observable.forkJoin(obs2).subscribe(res=>{
                    this.linksInfoToAdd = new Array();
                    this.linksInfoToDel = new Array();
                    this.linksCatToAdd = new Array();
                    this.linksCatToDel = new Array();
                    this.saveEnd(true);
                });
            }
        }
        
    }

    saveInfoImg() : Observable<any>{
        if(this.imgsInfo.length>0){
            return this.serviceInformation.uploadImgs(this.imgsInfo);
        }
        return undefined;
    }

    /**
     * Enregistrement des catégories et des liens de leurs liens de parenté
     * @return Observable des requètes joué
     */
    saveCategories() : Observable<any>{
        
        //on utilise un tableau d'Observable pour effectuer une action quand toutes les requètes correspondant seront fini 
        let obs : Observable<any>[] = new Array();
        
        let ob = this.saveNewCategories();
        if(!Utils.isUndefined(ob)){
            //si la requète à été joué on push
            obs.push(ob);
        }
        ob = this.saveOldCategories();
        if(!Utils.isUndefined(ob)){
            //si la requète à été joué on push
            obs.push(ob);
        }
        ob = this.deleteCategories();
        if(!Utils.isUndefined(ob)){
            //si la requète à été joué on push
            obs.push(ob);
        }

        return Observable.forkJoin(obs);
    }

    /**
     * Met à jour les catégories déjà en base
     * @return Observable des requètes ou undefined si il n'y avait pas de requète a jouer
     */
    saveOldCategories() : Observable<any> | undefined{
        //on récupère seulement les catégories qui ne sont pas nouvelles
        let categories : Categorie[] = Categorie.filterMoreThanId(this.categoriesToSave, 0);
        //si il y des catégorie modifié
        if(categories.length>0){
            //on les modifient
            return this.serviceCategorie.updateCategories(categories);
        }
        return undefined
    }

    /**
     * Sauvegarde les nouvelles catégories et remplace leurs id provisoire par la définitive
     * @return Observable des requètes ou undefined si il n'y avait pas de requète a jouer
     */
    saveNewCategories() : Observable<any> | undefined{

        //récupère les nouvelles catégories
        let newCat : Categorie[]
        newCat = Categorie.filterLessThanId(this.categoriesToSave, 0);
        
        //si il y a des nouvelles catégories
        if(newCat.length>0){
            //on les ajoutent
            let add = this.serviceCategorie.addCategories(newCat);

            //quand elles sont ajouté la reponse de la requète contient l'id de la catégorie, on va donc assigné à chaque catégorie sa véritable id maintenant qu'elle est défini
            add.subscribe(res=>{
                //pour chaque réponse (id)
                res.forEach((res,index)=>{
                //on remplace l'ancienne id provisoire par la définitive : 
                //dans les liens
                this.linksCat.forEach(link=>{
                    if(link.idParent === newCat[index].id){
                    link.idParent = res;
                    }

                    if(link.idEnfant === newCat[index].id){
                    link.idEnfant = res;
                    }
                });

                this.linksCatToAdd.forEach(link=>{
                    if(link.idParent === newCat[index].id){
                    link.idParent = res;
                    }

                    if(link.idEnfant === newCat[index].id){
                    link.idEnfant = res;
                    }
                });

                this.linksInfoToAdd.forEach(link=>{
                    if(link.idParent === newCat[index].id){
                    link.idParent = res;
                    }
                });
                
                //et dans la catégorie elle même
                newCat[index].id = res;
                });
                //on peut donc rafraichir l'arbre pour qu'il ai les catégories avec les bonnes id
                this.reloadTree();
            });
            return add;
        }
        return undefined;
    }

    /**
     * Met a jour les liens des catégories (ajout et supression)
     * @return Observable des requètes 
     */
    saveCategorieLinks() : Observable<any>{
        let obs : Observable<any>[] = new Array();
        if(this.linksCatToAdd.length>0){
            obs.push(this.serviceCategorie.addCategorieEnfants(this.linksCatToAdd));
        }
        if(this.linksCatToDel.length>0){
            obs.push(this.serviceCategorie.delCategorieEnfants(this.linksCatToDel));
        }
        return  Observable.forkJoin(obs);
    }

    /**
     * Supprime les catégories
     * @return Observable des requètes ou undefined si il n'y avait pas de requète a jouer
     */
    deleteCategories() : Observable<any> | undefined{
        if(this.catDeleted.length>0){
            //on les supprime si elle sont déjà en base
            let cats : Categorie[] = Categorie.filterMoreThanId(this.catDeleted, 0);
            //supression
            return this.serviceCategorie.deleteCategories(cats);
        }
        return undefined;
    }

    /**
     * Ajoute/Supprime les liens
     */
    saveLinks() : Observable<any> | undefined{
        if(this.linksCatToAdd.length>0 || this.linksCatToDel.length>0 || this.linksInfoToAdd.length>0 || this.linksInfoToDel.length>0){
            
            let obs : Observable<any>[] = new Array();

            if(this.linksCatToAdd.length>0 || this.linksCatToDel.length>0){
                obs.push(this.saveCategorieLinks());
            }

            if(this.linksInfoToAdd.length>0 || this.linksInfoToDel.length>0){
                obs.push(this.saveInformationLinks());
            }

            return Observable.forkJoin(obs);
        }
        return undefined
        
    }

    /**
     * Sauvegardes les informations ajouté/modifié
     * @return Observable des requètes
     */
    saveInformations() : Observable<any>{
        //on utilise un tableau d'Observable pour effectuer une action quand toutes les requètes correspondant seront fini 
        let obs : Observable<any>[] = new Array();

        let ob = this.saveNewInformations();
        if(!Utils.isUndefined(ob)){
            obs.push(ob);
        }
        ob = this.saveOldInformations();
        if(!Utils.isUndefined(ob)){
            obs.push(ob);
        }
        ob = this.deleteInformations();
        if(!Utils.isUndefined(ob)){
            obs.push(ob);
        }
        //quand les requète sont fini
        return Observable.forkJoin(obs)
    }

    /**
     * Sauvegarde les modification apporté au information
     * @return Observable des requètes ou undefined si il n'y avait pas de requète a jouer
     */
    saveOldInformations() : Observable<any> | undefined{
        //on récupère seulement les catégories qui ne sont pas nouvelles
        let informations : Information[] = Information.filterMoreThanId(this.informationToSave, 0);
        //si il y des catégorie modifié
        if(informations.length>0){
            //on les modifient
            return this.serviceInformation.updateInformations(informations);
        }
        return undefined
    }

    /**
     * Sauvegarde les nouvelles informations
     * @return Observable des requètes ou undefined si il n'y avait pas de requète a jouer
     */
    saveNewInformations() : Observable<any> | undefined{

        //récupère les nouvelles catégories
        let newinfos : Information[]
        newinfos = Information.filterLessThanId(this.informationToSave, 0);
        
        //si il y a des nouvelles catégories
        if(newinfos.length>0){
            //on les ajoutent
            let add = this.serviceInformation.addInfos(newinfos);

            //quand elles sont ajouté la reponse de la requète contient l'id de la catégorie, on va donc assigné à chaque catégorie sa véritable id maintenant qu'elle est défini
            add.subscribe(res=>{
                //pour chaque réponse (id)
                res.forEach((res,index)=>{
                //on remplace l'ancienne id provisoire par la définitive : 
                //dans les liens
                this.linksInfo.forEach(link=>{
                    if(link.idEnfant === newinfos[index].id){
                    link.idEnfant = res;
                    }
                });

                this.linksInfoToAdd.forEach(link=>{
                    if(link.idEnfant === newinfos[index].id){
                    link.idEnfant = res;
                    }
                });
                
                //et dans la catégorie elle même
                newinfos[index].id = res;
                });
                //on peut donc rafraichir l'arbre pour qu'il ai les catégories avec les bonnes id
                this.reloadTree();
            });
            return add;
        }
        return undefined;
    }

    /**
     * Supprime/ajoute les liens des informations
     * @return Observable des requètes 
     */
    saveInformationLinks() : Observable<any> | undefined{
        let obs : Observable<any>[] = new Array();
        if(this.linksInfoToAdd.length>0){
            obs.push(this.serviceInformation.addCategorieEnfants(this.linksInfoToAdd));
        }
        if(this.linksInfoToDel.length>0){
            obs.push(this.serviceInformation.delCategorieEnfants(this.linksInfoToDel));
        }
        return Observable.forkJoin(obs);
    }

    /**
     * Supprime les informations
     */
    deleteInformations() : Observable<any> | undefined{
        if(this.infoDeleted.length>0){
            //on les supprime si elle sont déjà en base
            let infos : Information[] = Information.filterMoreThanId(this.infoDeleted, 0);
            //supression
            let obs = this.serviceInformation.deleteInformations(infos);
            obs.subscribe(res=>{
                this.infoDeleted = new Array();
            });
            return obs;
        }
        return undefined;
    }

    /**
     * Notifie le composant que la sauvegarde est terminé (la notification dure 1,5s)
     */
    saveEnd(status : boolean){
      switch (status) {
        case true:
          this.saveEnded = true;
          setTimeout(()=>{
            this.saveEnded = false;
          }, 15000);
          break;
      
        default:

          break;
      }
    }
}

