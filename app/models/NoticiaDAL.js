module.exports = class TarefasDAL{
 
    constructor(conexao) {
        this.conexao = conexao;
    }
    
    FindAll(){
        return new Promise(function(resolve, reject){
            this.conexao.query('SELECT * FROM tarefas ',  function(error, elements){
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
 
    FindPage(pagina, total){
        return new Promise((resolve, reject)=>{
            this.conexao.query('SELECT * FROM tarefas limit '+ pagina + ', '+ total,  function(error, elements){
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };
    
    Create(dadosForm){
        return new Promise((resolve, reject)=>{
            this.conexao.query("INSERT INTO tarefas SET ?", dadosForm,  function(error, elements){
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };


    TotalReg(){
        return new Promise((resolve, reject)=>{
            this.conexao.query('SELECT count(*) total FROM tarefas ',  function(error, elements){
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

}