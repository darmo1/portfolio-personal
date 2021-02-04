import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { db } from "../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEditLink = async (linkObject) => {
    //LITERAL
    //Guarde en la base de datos una coleccion llamada links
    //y cree un documento(dato) y ajustelo con el valor de linkObject
    //Esta operacion es un proceso asincrono
    if (currentId === "") {
      await db.collection("links").doc().set(linkObject);
      console.log("New Task saved");
    } else {
      await db.collection("links").doc(currentId).update(linkObject);
      console.log("Data is updated");
      setCurrentId("");
    }
  };

  const getLinks = async () => {
    //const querySnapshot = await db.collection('links').get()<
    //onSnapshot mantiene preguntando si existe un cambio
    db.collection("links").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
        //console.log(doc.data())
        //console.log(doc.id)
        docs.push({ ...doc.data(), id: doc.id });
      });

      setLinks(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  const handleDeleteLink = async (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this link?"
    );
    if (isConfirm) {
      await db.collection("links").doc(id).delete();
      console.log("Task deleted");
    }
  };

  return (
    <div>
      <div className="col-md p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card  mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h3>{link.name}</h3>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => handleDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>

              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noreferrer">
                Go to website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
