import axios, { AxiosRequestConfig } from 'axios';

const performDatabaseOperation = async (
    collection: string,
    database: string,
    operation: 'find' | 'insert',
    optional_payload?: any
): Promise<any> => {
    const apiKey: string | undefined = process.env.MONGODB_API_KEY;

    if (!apiKey) {
        throw new Error('API key not found in environment variables');
    }

    let requestData: any = {
        collection,
        database,
        dataSource: 'Cluster0',
    };

    if (operation === 'find' && optional_payload) {
        requestData.query = optional_payload; // For find operation, nest the query under 'query'
    } else if (operation === 'insert' && optional_payload) {
        requestData = { ...requestData, ...optional_payload }; // For insert operation, merge payloads directly
    }

    const config: AxiosRequestConfig = {
        method: 'post',
        url: `https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gtwnf/endpoint/data/v1/action/${operation}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': apiKey,
        },
        data: JSON.stringify(requestData),
    };

    try {
        const response = await axios(config);
        console.log(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const readDB = async (collection: string, database: string, query?: any): Promise<any> => {
    return performDatabaseOperation(collection, database, 'find', query);
};

export const writeDB = async (collection: string, database: string, newData: any): Promise<any> => {
    return performDatabaseOperation(collection, database, 'insert', newData);
};
