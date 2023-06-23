import { useState, useEffect } from 'react';

const useFetch = (url, method = "POST", data = false) =>
{
    const [daata, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const response = await fetch(url, {
                    method: method, headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data ? JSON.stringify(data) : ""
                });
                if (!response.ok)
                {
                    throw new Error('Request failed');
                }
                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (error)
            {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { daata, loading, error };
};

export default useFetch;
