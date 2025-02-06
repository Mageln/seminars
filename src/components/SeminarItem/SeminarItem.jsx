import PropTypes from "prop-types";
import { Edit, Trash } from "lucide-react";
import css from "./SeminarItem.module.scss";

const SeminarItem = ({ seminar, onDelete, onEdit }) => {
  
  return (
    <li className={css.seminarCard}>
      <h2 className={css.title}>{seminar.title}</h2>
      <p className={css.date}>{seminar.date} {seminar.time} </p>
      <p className={css.description}>{seminar.description}</p>
      <img className={css.photo} src={seminar.photo} alt={seminar.title} />
      <div className={css.actions}>
        <button className={`${css.button} ${css.edit}`} onClick={() => onEdit(seminar.id)}>
          <Edit /> Редактировать
        </button>
        <button className={`${css.button} ${css.delete}`} onClick={() => onDelete(seminar.id)}>
          <Trash /> Delete
        </button>
      </div>
    </li>
  );
};

SeminarItem.propTypes = {
  seminar: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default SeminarItem;