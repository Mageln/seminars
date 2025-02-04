import { useState } from "react";
import css from "./SeminarList.module.scss";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditSeminarModal from "../EditSeminarModal/EditSeminarModal";
import SeminarItem from "../SeminarItem/SeminarItem";
import useSeminars from "../../hook/useSeminars";

const SeminarList = () => {
  const { seminars, loading, error, handleDelete, handleUpdate } = useSeminars();
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [seminarToDelete, setSeminarToDelete] = useState(null);

  // Открытие модального окна с подтверждением удаления
  const confirmDelete = () => {
    handleDelete(seminarToDelete);
    setDeleteModalOpen(false);
  };

  // Открытие модального окна для редактирования
  const handleEdit = (id) => {
    const seminarToEdit = seminars.find((seminar) => seminar.id === id);
    setSelectedSeminar(seminarToEdit);
    setEditModalOpen(true);
  };

  // Сохранение редактирования
  const handleSave = (id, updatedData) => {
    handleUpdate(id, updatedData);
    setEditModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Seminars</h1>
      <ul className={css.seminarList}>
        {seminars.map((seminar) => (
          <SeminarItem
            key={seminar.id}
            seminar={seminar}
            onDelete={(id) => {
              setSeminarToDelete(id);
              setDeleteModalOpen(true);
            }}
            onEdit={handleEdit}
          />
        ))}
      </ul>
      {isEditModalOpen && (
        <EditSeminarModal
          seminar={selectedSeminar}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default SeminarList;