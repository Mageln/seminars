import PropTypes from "prop-types";
import { useState } from "react";
import css from "./EditSeminarModal.module.scss";


const EditSeminarModal = ({ seminar, onClose, onSave }) => {
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(seminar.id, { title, description, });
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.log("Ошибка при сохранении:", error);
      setError("Не удалось сохранить изменения. Пожалуйста, попробуйте снова.");
    }
  };

  return (
    <div className={`${css.modalOverlay} ${css.open}`}>
      <div className={css.modalContent}>
        <form onSubmit={handleSubmit}>
          <h2>Редактировать Seminar</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />


          <button type="submit">Сохранить</button>
          <button type="button" onClick={onClose}>
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
};

EditSeminarModal.propTypes = {
  seminar: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditSeminarModal;