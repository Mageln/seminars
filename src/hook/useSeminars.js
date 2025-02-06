import { useState, useEffect } from "react";
import { fetchSeminars, deleteSeminar, updateSeminar } from "../api/api";
import { toast } from "react-toastify";

const useSeminars = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  useEffect(() => {
    const loadSeminars = async () => {
      try {
        const data = await fetchSeminars();
        setSeminars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadSeminars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSeminar(id);
      setSeminars((prev) => prev.filter((seminar) => seminar.id !== id));
      toast.success("Семинар успешно удален!"); 
    } catch (err) {
      setError(err.message);
      toast.error("Ошибка при удалении семинара.");
    }
  };
  const handleUpdate = async (id, updatedData) => {
    try {
      await updateSeminar(id, updatedData);
      setSeminars((prev) =>
        prev.map((seminar) => (seminar.id === id ? { ...seminar, ...updatedData } : seminar))
      );
      toast.success("Семинар успешно обновлен!"); 
    } catch (err) {
      setError(err.message);
      toast.error("Ошибка при обновлении семинара."); 
    }
  };
  const confirmDelete = async (id) => {
    await handleDelete(id);
    setDeleteModalOpen(false);
  };

  const handleEdit = (id, setSelectedSeminar, setEditModalOpen) => {
    const seminarToEdit = seminars.find((seminar) => seminar.id === id);
    setSelectedSeminar(seminarToEdit);
    setEditModalOpen(true);
  };

  const handleSave = async (id, updatedData, setEditModalOpen) => {
    await handleUpdate(id, updatedData);
    setEditModalOpen(false);
  };

  return { seminars, loading, error, confirmDelete, handleEdit, handleSave,isDeleteModalOpen,setDeleteModalOpen };
};

export default useSeminars;