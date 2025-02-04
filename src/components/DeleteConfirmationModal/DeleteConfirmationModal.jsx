import PropTypes from 'prop-types';
import css from "./DeleteConfirmationModal.module.scss";

const DeleteConfirmationModal = ({isOpen,onClose,onConfirm}) => {
    if(!isOpen) return null
  return (
    <div className={css.modal__overlay}>
<div className={css.modal__content}>
<h2>Вы уверены, что хотите удалить?</h2>
<button onClick={onConfirm}>Удалить</button>
<button onClick={onClose}>Отмена</button>
</div>
    </div>
  )
}
DeleteConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };
export default DeleteConfirmationModal

