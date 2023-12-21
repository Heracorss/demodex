import bodyParser from "body-parser";
import express from "express"
import axios from "axios";

const master=express();
const port=3000;
let dark_deku;

master.use(bodyParser.urlencoded({extended:true}))
master.use(express.static("public"))

master.get("/",(req,res)=>{
    res.render("index.ejs")
});

master.post("/enter",async (req,res)=>{
    const data=req.body.monster;
    
    try{
        const response= await axios.get(" https://pokeapi.co/api/v2/pokemon/"+data.toLowerCase());
        const roar=await axios.get("https://pokeapi.co/api/v2/pokemon-form/"+data.toLowerCase());
        // const ability=await axios.get("https://pokeapi.co/api/v2/ability/"+data.toLowerCase());
        // .then(res=> data.res.results)
        const boruto=response.data;
        const sukasa=roar.data;
        let something="fire";
        let energy;
        // const nasa=ability.data;
        // console.log(nasa)
        // let encode='official-artwork'
        // let victory=encodeURIComponent(encode)
        // console.log(boruto?.sprites.other.officialartwork)
        // console.log(boruto.abilities)
        // console.log(roar.data.types)
        // console.log(roar.data)
        // abilities
        for (let index = 0; index < boruto.abilities.length; index++) {

            const element = boruto.abilities[index].ability.name;
            const ability_description=await axios.get("https://pokeapi.co/api/v2/ability/"+element)
            const deku=ability_description.data;
            dark_deku=deku.effect_entries[1].short_effect;
            
        }
        res.render("index.ejs",{
            photo:boruto.name,
            id:boruto.id,
            sun:boruto?.sprites.other.dream_world.front_default,
            typo:roar.data.types,
            ability:boruto.abilities,
            detail:dark_deku,
            supersonic:energy,
        })
    }catch(error){
        console.error("error occur",error.message)
        res.render("index.ejs",{
            bug:error.message,
        })
    }
//   res.redirect("/")
   
})
master.listen(port,()=>{
    console.log(`Currently ${port} is running`)
})