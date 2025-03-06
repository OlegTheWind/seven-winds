import { useState } from 'react';
import { API_URL, createRowInEntity } from '../../../constants/constants';
import { CreateEntityParams, UseCreateEntityResult } from '../types';

const useCreateEntity = ({
    id,
    requestData,
}: CreateEntityParams): UseCreateEntityResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<any>(null);

    const createEntity = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `${API_URL}${id}${createRowInEntity}`;

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
            console.error('Error creating entity:', error);
            setError(error instanceof Error ? error.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return { createEntity, loading, error, responseData };
};

export default useCreateEntity;
