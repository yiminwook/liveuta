import axios, { AxiosRequestConfig } from 'axios';

interface PerformDatabaseOptions {
    collection: string;
    database: string;
    operation: 'find' | 'insert';
    filter?: any;
    projection?: any;
    document?: any;
}

const performDatabaseOperation = async ({
    collection,
    database,
    operation,
    filter,
    projection,
    document,
}: PerformDatabaseOptions): Promise<any> => {
    const apiKey: string | undefined = process.env.MONGODB_API_KEY;

    if (!apiKey) {
        throw new Error('API key not found in environment variables');
    }

    let requestData: any = {
        collection,
        database,
        dataSource: 'Cluster0',
        filter,
        projection,
        document,
    };

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

export const readDB = async (
    collection: string,
    database: string,
    options?: { filter?: any; projection?: any }
): Promise<any> => {
    return performDatabaseOperation({
        collection,
        database,
        operation: 'find',
        filter: options?.filter,
        projection: options?.projection,
    });
};

export const writeDB = async (
    collection: string,
    database: string,
    options?: { document?: any }
): Promise<any> => {
    return performDatabaseOperation({
        collection,
        database,
        operation: 'insert',
        document: options?.document,
    });
};
