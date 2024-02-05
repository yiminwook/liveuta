import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import errorHandler from '@/models/error/handler';
import { readDB, writeDB } from '@/models/mongoDBService'; 
import { parseAllData, parseScheduledData } from '@/utils/parseContentSheet';
import { SheetAPIReturntype } from '@/types/inSheet';

export const GET = async (_req: NextRequest) => {
    try {
        const cookieStore = cookies();
        const cookie = cookieStore.get('select')?.value || 'all';

        const collection = process.env.MONGODB_SCHEDULE_COLLECTION;
        const database = process.env.MONGODB_SCHEDULE_DB;

        if (!collection || !database) {
            throw new Error('MongoDB collection or database names are not defined in environmental variables.');
        }

        const scheduleData = await readDB(collection, database);

        let { scheduled, live } = parseScheduledData(scheduleData); // Need to be revised
        let { daily, all } = parseAllData(scheduleData); // Need to be revised

        // Not sure, but maybe need to be revised
        switch (cookie) {
            case 'video':
                scheduled.contents = scheduled.contents.filter((item) => item.isVideo === true);
                live.contents = live.contents.filter((item) => item.isVideo === true);
                daily.contents = daily.contents.filter((item) => item.isVideo === true);
                all.contents = all.contents.filter((item) => item.isVideo === true);
                break;
            case 'stream':
                scheduled.contents = scheduled.contents.filter((item) => item.isVideo !== true);
                live.contents = live.contents.filter((item) => item.isVideo !== true);
                daily.contents = daily.contents.filter((item) => item.isVideo !== true);
                all.contents = all.contents.filter((item) => item.isVideo !== true);
                break;
            default:
                break;
        }

        // Need to revise SheetAPIReturntype
        return NextResponse.json<SheetAPIReturntype | undefined>({ scheduled, live, daily, all }, { status: 200 });
    } catch (error) {
        console.error(error);
        const { status, message } = errorHandler(error);
        return NextResponse.json({ error: message }, { status });
    }
};


export const POST = async (req: NextRequest) => {
    try {
        const requestBody: PushData = await req.json();

        const notiCollection = process.env.MONGODB_NOTI_COLLECTION;
        const notiDatabase = process.env.MONGODB_SCHEDULE_DB;

        if (!notiCollection || !notiDatabase) {
            throw new Error('MongoDB collection or database names are not defined in environmental variables.');
        }

        const existingData = await readDB(notiCollection, notiDatabase, { token: requestBody.token, link: requestBody.link });

        if (existingData) {
            return NextResponse.json({ message: '이미 등록된 알림입니다.' }, { status: 226 });
        }

        await writeDB(notiCollection, notiDatabase, requestBody);

        return NextResponse.json({ message: '알림이 성공적으로 등록되었습니다.' }, { status: 201 });
    } catch (error) {
        console.error(error);
        const { status, message } = errorHandler(error);
        return NextResponse.json({ message: message }, { status });
    }
};
