import React, { Fragment, useState } from "react";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";

const RecipeTile = ({ recipe }) => {
  const [CreateModalOpen, setCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    console.log("hllo");
    setCreateModalOpen(false);
  };
  return (
    <Fragment>
      <div>
        <div className="recipeTile" onClick={openCreateModal}>
          <img className="recipeTile__img" alt="" src={recipe["image"]} />
          <p className="recipeTile__name" key={uuidv4()}>
            {recipe["label"]}
          </p>
        </div>
        <div>
          <Modal
            isOpen={CreateModalOpen}
            onClose={closeCreateModal}
            recipe={recipe}
          ></Modal>
        </div>
      </div>
    </Fragment>
  );
};

export default RecipeTile;
