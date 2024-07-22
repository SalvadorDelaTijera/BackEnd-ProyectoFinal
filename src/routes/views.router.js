import express from "express";

const router = express.Router();

let food = [

  {name: "pizza", price: "100"},
  {name: "carne", price: "200"},
  {name: "lomo", price: "500"}
];

//----PARA RENDERIZAR debe estar en routes
router.get('/', (req, res) =>{
  let testUser = {
    name: "salvador",
    last_name: "De la Tijera",
    role: "admin"
  }

 //res.render METODO PSRA RENDERIZAR
 res.render('index', {
  user: testUser,
  isAdmin: testUser.role === "admin",// boolean
  food //cundo clave u valor es lo mismo solo se pone asi
}
); //test user recibe le render
})

export default router;