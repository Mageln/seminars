import { useState, useEffect } from "react";
import { fetchSeminars, deleteSeminar, updateSeminar } from "../api/api";

const useSeminars = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateSeminar(id, updatedData);
      setSeminars((prev) =>
        prev.map((seminar) => (seminar.id === id ? { ...seminar, ...updatedData } : seminar))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return { seminars, loading, error, handleDelete, handleUpdate };
};

export default useSeminars;