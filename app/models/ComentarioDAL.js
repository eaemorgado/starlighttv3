module.exports = class ProdutosDAL {

    constructor(starlight){
        this.starlight = starlight;
    }
    
    FindAll(){
        return new Promise(function(resolve, reject){
            this.starlight.query('SELECT * FROM comentarios ',  function(error, elements){
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    findID(id) {
        return new Promise((resolve, reject) => {
            this.starlight.query("SELECT * FROM comentarios WHERE id_comentario = ?", [id], function(error, elements){
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    ALIKE(id, camposJson){
        return new promise(function(resolve, reject){
            this.starlight.query('UPDATE comentarios SET ? WHERE id_comentario = ?', [camposJson,id], function(error, elements){
                if(error){
                    return reject(error)
                }
                return resolve(elements)
            }
         )})
    };

    // findUserEmail(camposForm) {
    //     return new Promise((resolve, reject) => {
    //         this.athenashop.query("SELECT * FROM produtos WHERE email = ?",
    //         [camposForm.email],
    //             function (error, elements) {
    //                 if (error) {
    //                     return reject(error);
    //                 }

    //                 return resolve(elements);
    //             });
    //     });
    // };

    findID(id) {
        return new Promise((resolve, reject) => {
            this.starlight.query('SELECT * FROM comentarios WHERE  id_comentario = ?', [id], function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    FindPage(pagina, total){
        return new Promise((resolve, reject)=>{
            this.starlight.query('SELECT * FROM comentarios limit '+ pagina + ', '+ total,  function(error, elements){
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    TotalReg(){
        return new Promise((resolve, reject)=>{
            this.starlight.query('SELECT count(*) total FROM comentarios ',  function(error, elements){
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    create(camposJson) {
        return new Promise((resolve, reject) => {
            this.starlight.query("insert into comentarios set ?",
                camposJson,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    }
    update(camposJson, id) {
        return new Promise((resolve, reject) => {
            this.starlight.query("UPDATE comentarios SET ? WHERE id = ?",
            [camposJson, id],
            function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    // delete(id) {
    //     return new Promise((resolve, reject) => {
    //         this.athenashop.query("UPDATE produtos SET id_tipo_usuario = 0 WHERE id = ?", [id], function (error, results) {
    //             if (error) {
    //                 return reject(error);
    //             }
    //             return resolve(results[0]);
    //         });
    //     });
    // }
}