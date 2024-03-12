import Button from "./Button/Button";
import { useState } from "react";

export default function ModalForm({ aggiungiCorso }) {
  const [nuovoCorso, setNuovoCorso] = useState({
    nomeCorso: "",
    idCategoria: "",
    durata: "",
    descrizioneBreve: "",
    descrizioneCompleta: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuovoCorso({ ...nuovoCorso, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    aggiungiCorso(nuovoCorso);
    setNuovoCorso({
      nomeCorso: "",
      idCategoria: "",
      durata: "",
      descrizioneBreve: "",
      descrizioneCompleta: "",
    });
  };

  return (
    <>
      <Button
        type="button"
        className="btn btn-success ms-3 mt-3 addCourseButton"
        data-bs-toggle="modal"
        data-bs-target="#addNewCourseModal"
      >
        Aggiungi corso
      </Button>

      <div
        className="modal fade"
        id="addNewCourseModal"
        tabIndex="-1"
        aria-labelledby="aggiungiNuovoCorsoModale"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="aggiungiNuovoCorsoModale">
                Nuovo corso
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="formNuovoCorso" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    required
                    name="nomeCorso"
                    type="text"
                    className="form-control"
                    id="nomeCorso"
                    placeholder="Nome corso"
                    value={nuovoCorso.nomeCorso}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label>
                    Durata
                    <select
                      name="durata"
                      form="formNuovoCorso"
                      required
                      value={nuovoCorso.durata}
                      onChange={handleChange}
                    >
                      <option value="">Seleziona una durata</option>
                      <option value="8">8 ore</option>
                      <option value="40">40 ore</option>
                      <option value="160">160 ore</option>
                      <option value="480">480 ore</option>
                      <option value="960">960 ore</option>
                    </select>
                  </label>
                  <div className="mb-3">
                    <label>
                      Categoria
                      <select
                        name="idCategoria"
                        form="formNuovoCorso"
                        required
                        value={nuovoCorso.idCategoria}
                        onChange={handleChange}
                      >
                        <option value="">Seleziona una categoria</option>
                        <option value="1">FrontEnd</option>
                        <option value="2">BackEnd</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    required
                    name="descrizioneBreve"
                    className="form-control"
                    id="descrizioneBreve"
                    placeholder="Descrizione breve"
                    value={nuovoCorso.descrizioneBreve}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    required
                    name="descrizioneCompleta"
                    className="form-control"
                    id="descrizioneCompleta"
                    placeholder="Descrizione completa"
                    value={nuovoCorso.descrizioneCompleta}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-column ">
                  <button
                    type="button"
                    className="btn btn-warning mb-1"
                    data-bs-dismiss="modal"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success mt-1"
                  >
                    Aggiungi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
