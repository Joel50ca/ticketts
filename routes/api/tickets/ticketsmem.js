// serializar
const fs = require('fs');

const filename = "ticket.json";

let fileFirstRead = false;

const writeToFile = (handler)=>{
  fs.writeFile(
    filename, // archivo
    JSON.stringify(ticketsList), //informacion JSON
    handler //la funcion que se disapara un vez guardado el archivo
  );
}

const readFile = (handler)=>{
  fs.readFile(
    filename,
    'utf8',
    handler
  );
}

var ticketsList = [];

if(!fileFirstRead){
  readFile(
    (err,object)=>{
      if(err){
        console.log(err);
      }else{
        ticketsList = JSON.parse(object);
      }
    }
  );
}

let ticketsStruct = {
  nombre:"",
  artista:"",
  album:"",
  año:"",
  genero:""
}

module.exports.getAllTickets = ()=>{
  return ticketsList;
}

module.exports.getById = (id)=>{
  try {
    return ticketsList[id];
  }catch(ex){
    return {};
  }
}


/*
var fun = function(a){
  return a
}
var fun = (a) => {return a};
 */
module.exports.getStruct = ()=>{
  // ES6 esto se conoce como destructor de objetos
  return { ...ticketsStruct }; //clone
}

module.exports.addToList = ( camisa ) =>{
  ticketsList.push(camisa);
  writeToFile(
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File Succesfully Saved!!!");
      }
    }
  );
  return ticketsList.length -1;
}

module.exports.update = (id, nombre, artista, album, año, genero) => {
  if (id >= ticketsList.length);
  ticketsList[id] = {
    ...ticketsList[id], // old values
    ...{ nombre, artista, album, año, genero } // new values
  };
  writeToFile(
    (err)=>{
      if(err){
        console.log(err);
      }else {
        console.log("File Succesfully Saved!!!");
      }
    }
  );
  return ticketsList[id];

}

module.exports.deleteticket = (id)=>{
  let newticketsList = ticketsList.filter(
    (ticket, index)=>{ 
      return index != id;
    }
  );
  ticketsList = newticketsList;
  writeToFile(
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File Succesfully Saved!!!");
      }
    }
  );
  return true;
}