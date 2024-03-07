const express = require("express");

const mysql = require("mysql");

const app = express(); 

let conexion = mysql.createConnection({
    host:"localhost",
    database: "bd_firma",
    user: "root",
    password : ""
});

//deben aparecer antes de los paths
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", function(req, res){
    res.render("registro");
});

app.post("/validar", function(req, res){
    const datos = req.body;
    let ced = datos.cedula; 

    
    let generateFirma = (base, length) => {
        let Firma = "";
        for (let x = 0; x < length; x++) {
            let random = Math.floor(Math.random() * base.length);
            Firma += base.charAt(random);
        }
        return Firma;
    };


    const generate = () => {
        let length = 16;
    
        const base = "0123456789";
    
        generatedFirma.innerText = generateFirma(base, length);
    };


        window.addEventListener("DOMContentLoaded", () => {
        btnGenerate.addEventListener("click", () => {
            generate();
        });
    });

    
    
    let length = 16;
    
    const base = "0123456789";

    let firma_digital = datos.generateFirma;

    
    let buscar = "SELECT * FROM tabla_entidades WHERE cedula = "+ ced +""; 

    conexion.query(buscar, function(error, row){
        if(error){
            throw error;
        }else{
           if(row.length>0){
                console.log("No se puede registrar, entidad ya existe");
           }else{
           
            let registrar = "INSERT INTO tabla_entidades (cedula, firma_digital) VALUES ('"+ ced +"', '"+ firma_digital +"')"; 

            conexion.query(registrar, function(error){
                if(error){
                    throw error;
                }else{
                   console.log("Datos almacenados correctamente"); 
                }
            });
        
           }
        }
    });

}); 


app.listen(3000, function(){
    console.log("Servidor creado http://localhost:3000"); 
}); 