var express = require("express");
var router = express.Router();

var  { getAllTickets,
  getById,
  getStruct,
  addToList,
  update,
  deleteTicket} = require("./ticketsmem");


router.get(
    "/version",
    (req, res)=>{
        res.json({"terea": "tickets"});
    }


);

router.get(
    "/",
    (req, res)=>{
      res.status(200).json(getAllTickets());
    }
  ); // get /
  
  router.get(
    "/byid/:ticketid",
    (req, res)=>{
      console.log(req.params);
      var { ticketid } = req.params;
      res.status(200).json(getById(ticketid));
    }
  );

  router.post(
    "/new",
    (req, res)=>{
      const { nombre, artista, album, año, genero} = req.body;

      let newCancion = Object.assign(
                                      {},
                                      getStruct(),
                                      { nombre,
                                        artista,
                                        album,
                                        año,
                                        genero}
                                    );
      let index = addToList(newCancion);
      res.status(200).json({inserted:1, inserted_id:index});
    }
  ); // post new

  
  router.put(
    "/upd/:ticketid",
    (req, res)=>{
      const {  nombre, artista, album, año, genero } = req.body;
      const { ticketid } = req.params;
      var updatedTicket = update(
          ticketid,
          nombre,
          artista,
          album,
          año,
          genero
      ); 
      res.status(200).json(updatedTicket);
    }
  ); // put upd
  
  router.delete(
    "/del/:ticketid",
    (req, res)=>{
      let {ticketid} = req.params;
      deleteTicket(ticketid);
      res.status(200).json({"return":true});
    }
  );


module.exports = router;