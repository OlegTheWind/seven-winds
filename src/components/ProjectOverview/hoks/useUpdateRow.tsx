import { useState } from 'react';
import { API_URL, row, update } from '../../../constants/constants';
import { UpdateRowParams, UseUpdateRowResult } from '../types';

const useUpdateRow = ({ eId, rId }: UpdateRowParams): UseUpdateRowResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<any>(null);

    const updateRow = async (requestData: any) => {
        setLoading(true);
        setError(null);

        try {
            const url = `${API_URL}${eId}${row}/${rId}${update}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResponseData(data);
            return data;
        } catch (error) {
            console.error('Error updating row:', error);
            setError(error instanceof Error ? error.message : 'Unknown error');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { updateRow, loading, error, responseData };
};

export default useUpdateRow;
