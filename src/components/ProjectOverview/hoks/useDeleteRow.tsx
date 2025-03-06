import { useState } from 'react';
import { API_URL, row, deleteRow } from '../../../constants/constants';

interface UseDeleteRowProps {
    eId: number | null;
    rId: number | null;
}

interface UseDeleteRowResult {
    deleteRow: () => Promise<void>;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const useDeleteRow = ({ eId, rId }: UseDeleteRowProps): UseDeleteRowResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleDelete = async () => {
        if (!eId || !rId) {
            setError('Не указан ID сущности или строки');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const url = `${API_URL}${eId}${row}/${rId}${deleteRow}`;

            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccess(true);
        } catch (error) {
            console.error('Ошибка при удалении:', error);
            setError(
                error instanceof Error ? error.message : 'Неизвестная ошибка',
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        deleteRow: handleDelete,
        loading,
        error,
        success,
    };
};

export default useDeleteRow;
