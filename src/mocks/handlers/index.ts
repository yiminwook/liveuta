import { http, HttpResponse } from 'msw';

export const TEST_API_URL = 'http://localhost:3000';

const contents = [
  http.get(`${TEST_API_URL}/api/v1/schedule`, (req) => {
    return HttpResponse.json({
      message: '스케줄이 조회되었습니다.',
      data: {
        scheduled: [],
        live: [
          {
            title:
              '100曲＆高評価1万いくまで歌い続ける歌枠🎤一曲だけでも聞いていってください！ #あおぎり高校 #千代浦蝶美',
            videoId: 'VacgXNxlTrA',
            channelId: 'UCyY6YeINiwQoA-FnmdQCkug',
            timestamp: 1742616791000,
            utcTime: '2025-03-22T04:13:11.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '1163',
            tag: '',
          },
        ],
        daily: [
          {
            title: '今天的天氣好好睡  大家有好好休息嗎💜｜心 𝗰𝗼𝗰𝗼𝗿𝟬',
            videoId: 'lBZJ0E8a1xw',
            channelId: 'UC9NVe55fqFSC9iOZQJrlwrQ',
            timestamp: 1742627663000,
            utcTime: '2025-03-22T07:14:23.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '244',
            tag: '',
          },
        ],
        all: [
          {
            title: '高評価123ワンツースリーチャレンジ🎤🎶 リクエスト歓迎✨#ころんみゅーじっく',
            videoId: 'F3lAR2xsUQA',
            channelId: 'UCRZfmq3wjUpoT1hHuWx6jAA',
            timestamp: 1742629275000,
            utcTime: '2025-03-22T07:41:15.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '29',
            tag: '',
          },
          {
            title: '歌┊3000人耐久❣インターネット老人会歌枠♡',
            videoId: '-dhdXZJ5IPE',
            channelId: 'UCJJVsQC8hJ-By6M78nlunPA',
            timestamp: 1742630400000,
            utcTime: '2025-03-22T08:00:00.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '26',
            tag: '',
          },
          {
            title: "🔔 We sing n chill 🔔 it's the weekend!",
            videoId: 'ZcFq4e6fti8',
            channelId: 'UCPsbhqweA1dRtyncwzjQfRQ',
            timestamp: 1742632200000,
            utcTime: '2025-03-22T08:30:00.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '32',
            tag: '',
          },
          {
            title: 'VTuber54名の歌枠フェス！',
            videoId: 'HdnlGTkfkEk',
            channelId: 'UCnKQwqIT635aPEUWrTJrqPQ',
            timestamp: 1742634000000,
            utcTime: '2025-03-22T09:00:00.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '7',
            tag: '',
          },
          {
            title: 'あのアニソン歌います！平成曲から令和曲まで？！✨初見歓迎',
            videoId: '4EVbd6YQrV0',
            channelId: 'UCcPRh2IAWN4KVlcYN_-Vk1Q',
            timestamp: 1742634000000,
            utcTime: '2025-03-22T09:00:00.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '22',
            tag: '',
          },
          {
            title:
              '#CSP歌枠フェス2025春 Supported by LIVE DAM AiR 🎤カラオケ採点で大賞獲ります！！ #Karaoke',
            videoId: 'VNMxyC-jdrE',
            channelId: 'UCw4J-5X7x1xUdbIcQkZ4VYA',
            timestamp: 1742634000000,
            utcTime: '2025-03-22T09:00:00.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '32',
            tag: '',
          },
          {
            title: '♡夕方のおうたわく♡',
            videoId: '78kRZEq-jhk',
            channelId: 'UCX2w__Ry85MpNQcI898K3KA',
            timestamp: 1742634000000,
            utcTime: '2025-03-22T09:00:00.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '64',
            tag: '',
          },
          {
            title: 'CH登録6300人耐久！多声類Vがいろんな声で歌うよ✨️',
            videoId: 'L9K0cuWZNDI',
            channelId: 'UC21QLVAyOx_jmLhueQ_ha3w',
            timestamp: 1742634000000,
            utcTime: '2025-03-22T09:00:00.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '81',
            tag: '',
          },
          {
            title: 'まったりお歌雑談枠！初見さんもリクも◎',
            videoId: 'qEmYAVJc6NU',
            channelId: 'UCr4x5mB45xQ2Y8YERQseKIQ',
            timestamp: 1742634900000,
            utcTime: '2025-03-22T09:15:00.000Z',
            isStream: 'TRUE',
            interval: '',
            isVideo: false,
            viewer: '14',
            tag: '',
          },
        ],
      },
    });
  }),
];

export const handlers = [
  http.get(`${TEST_API_URL}/api/hello`, (req) => {
    return HttpResponse.json({
      message: 'Hello World!',
    });
  }),
  ...contents,
];
