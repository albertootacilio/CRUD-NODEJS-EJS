const express = require('express');  
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Lista = require("./database/Lista")

//Conexão com Banco 
connection.authenticate().then(()=>{
    console.log('Connection Sucess')
}).catch((msgErro)=>{
    console.log(msgErro);
})

//informando o express usar ejs
app.set('view engine','ejs');   
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render('index');
});


// READ
app.get("/listar",(req,res)=>{
    Lista.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(listas =>{
        res.render("listar",{
            listas : listas       
        });
    });
});

// READ 
app.get("/listar/:id",(req,res)=>{
    var id = req.params.id;
    Lista.findOne({
        where: {id:id}
    }).then(lista =>{
       if(lista !=undefined){
            res.render("editar",{
                lista:lista
            });
       } else{
             res.redirect("/"); 
       }
    });
})
// DELETE
app.get("/apagar/:id",(req,res)=>{
    Lista.destroy({
        where:{'id':req.params.id}
    }).then(()=>{
        res.redirect("/listar");
    }).catch(()=>{
        res.redirect("/");
    })
});


app.get("/tarefa",(req,res)=>{
    res.render('tarefa');
});

app.get("/menu",(req,res)=>{
    res.render('menu');
});

//UPDATE
app.get("/editar/:id",(req,res)=>{  
});


//CREATE
app.post("/salvarlista",(req,res)=>{
    var descricao = req.body.descricao;
    var status = req.body.status;
    var calendario = req.body.calendario;
    var observacao = req.body.observacao;
    Lista.create({
        descricao: descricao,
        status: status,
        calendario: calendario,
        observacao: observacao
    }).then(()=>{
        res.redirect("/");
    });
});

app.listen(8080,()=>{ console.log('running') });