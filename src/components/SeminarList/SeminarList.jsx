import { useState } from "react";
import css from "./SeminarList.module.scss";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditSeminarModal from "../EditSeminarModal/EditSeminarModal";
import SeminarItem from "../SeminarItem/SeminarItem";
import useSeminars from "../../hook/useSeminars";

const SeminarList = () => {
  const { seminars, loading, error, confirmDelete, handleEdit, handleSave,isDeleteModalOpen,setDeleteModalOpen } = useSeminars();
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [seminarToDelete, setSeminarToDelete] = useState(null);
  const [filterTitle, setFilterTitle] = useState("");

  const filteredSeminars = seminars.filter(seminar =>
    seminar.title.toLowerCase().includes(filterTitle.toLowerCase())
  );
  // Открытие модального окна с подтверждением удаления


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Seminars</h1>
      <input className={css.search} type="text"
      placeholder="Поиск"
      value={filterTitle}
      onChange={(e) => setFilterTitle(e.target.value)} />
      <ul className={css.seminarList}>
        {filteredSeminars.length > 0 ? (
        
        filteredSeminars.map((seminar) => (
          <SeminarItem
            key={seminar.id}
            seminar={seminar}
            onDelete={(id) => {
              setSeminarToDelete(id);
              setDeleteModalOpen(true);
            }}
            onEdit={() => handleEdit(seminar.id, setSelectedSeminar, setEditModalOpen)}
          />
        ))
      ):(

        <li>Нет подходящих</li>
      )
      }
      </ul>
      {isEditModalOpen && (
        <EditSeminarModal
          seminar={selectedSeminar}
          onClose={() => setEditModalOpen(false)}
          onSave={(id, updatedData) => handleSave(id, updatedData, setEditModalOpen)}
        />
      )}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => confirmDelete(seminarToDelete)}
      />
    </div>
  );
};

export default SeminarList;