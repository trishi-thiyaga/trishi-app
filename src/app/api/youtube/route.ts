import { NextResponse } from 'next/server';

export interface RealYouTubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  thumbnail: string;
  duration?: string;
  uploadDate?: string;
  url: string;
}

export interface RealChannelData {
  title: string;
  handle: string;
  channelId: string;
  channelUrl: string;
  subscribers: string;
  videoCount: string;
  avatarUrl: string;
  videos: RealYouTubeVideo[];
}

const FALLBACK_CHANNEL_DATA: RealChannelData = {
  title: 'Young Dream Innovators',
  handle: '@YoungDreamInnovators',
  channelId: 'UCDV6Egs27BJGncErfgATmVw',
  channelUrl: 'https://www.youtube.com/@YoungDreamInnovators',
  subscribers: '5 subscribers',
  videoCount: '7 videos',
  avatarUrl:
    'https://yt3.googleusercontent.com/fZFafc367m03_Qkgd5rEb9HxZz92Kat4LRT6gTE4O2e24OxwlDRdRYA3OKarW1ujBh5io91f=s900-c-k-c0x00ffffff-no-rj',
  videos: [
    {
      id: 'yeUtb5yqSk8',
      youtubeId: 'yeUtb5yqSk8',
      title: 'From Trash to Triumph! 🛠️⚡ Build Your Own DIY Electric Drone! #STEMKids',
      thumbnail: 'https://i.ytimg.com/vi/yeUtb5yqSk8/hq720.jpg',
      duration: '0:11',
      uploadDate: 'Recent',
      url: 'https://www.youtube.com/watch?v=yeUtb5yqSk8',
    },
    {
      id: 'l1gzslO13V0',
      youtubeId: 'l1gzslO13V0',
      title: 'From Trash to Triumph! 🛠️⚡ Build Your Own DIY Electric Boat! #STEMKids',
      thumbnail: 'https://i.ytimg.com/vi/l1gzslO13V0/hq720.jpg',
      duration: '0:11',
      uploadDate: 'Recent',
      url: 'https://www.youtube.com/watch?v=l1gzslO13V0',
    },
  ],
};

export async function GET() {
  try {
    const res = await fetch('https://www.youtube.com/@YoungDreamInnovators', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json(FALLBACK_CHANNEL_DATA);
    }

    const html = await res.text();
    const match = html.match(/var ytInitialData = ({.*?});<\/script>/);

    if (!match) {
      return NextResponse.json(FALLBACK_CHANNEL_DATA);
    }

    const data = JSON.parse(match[1]);
    const header =
      data?.header?.pageHeaderRenderer?.content?.pageHeaderViewModel;
    const metadataRows =
      header?.metadata?.contentMetadataViewModel?.metadataRows || [];

    let subscribers = '5 subscribers';
    let videoCount = '7 videos';

    for (const row of metadataRows) {
      const parts = row?.metadataParts || [];
      for (const p of parts) {
        const text = p?.text?.content;
        if (text?.includes('subscribers')) subscribers = text;
        if (text?.includes('videos')) videoCount = text;
      }
    }

    const avatarSources =
      header?.image?.decoratedAvatarViewModel?.avatar?.avatarViewModel?.image
        ?.sources || [];
    const avatarUrl =
      avatarSources.length > 0
        ? avatarSources[avatarSources.length - 1].url
        : FALLBACK_CHANNEL_DATA.avatarUrl;

    // Search for lockupViewModels for videos
    const videos: RealYouTubeVideo[] = [];
    const searchLockups = (obj: any) => {
      if (!obj) return;
      if (typeof obj === 'object') {
        if (obj.lockupViewModel) {
          const l = obj.lockupViewModel;
          const contentId = l.contentId;
          const label =
            l.rendererContext?.accessibilityContext?.label || '';
          const sources =
            l.contentImage?.thumbnailViewModel?.image?.sources || [];
          const thumb =
            sources.length > 0
              ? sources[sources.length - 1].url
              : `https://i.ytimg.com/vi/${contentId}/hqdefault.jpg`;

          if (contentId && !videos.find((v) => v.youtubeId === contentId)) {
            // Clean up label by removing duration from title if present
            const cleanTitle = label.replace(/\s*\d+\s*(seconds|minutes|hours).*$/i, '').trim() || label || 'Young Dream Innovators STEM Build';
            videos.push({
              id: contentId,
              youtubeId: contentId,
              title: cleanTitle,
              thumbnail: thumb,
              duration: label.includes('11 seconds') ? '0:11' : undefined,
              url: `https://www.youtube.com/watch?v=${contentId}`,
            });
          }
        }
        for (const k of Object.keys(obj)) {
          searchLockups(obj[k]);
        }
      }
    };

    searchLockups(data);

    return NextResponse.json({
      title: 'Young Dream Innovators',
      handle: '@YoungDreamInnovators',
      channelId: 'UCDV6Egs27BJGncErfgATmVw',
      channelUrl: 'https://www.youtube.com/@YoungDreamInnovators',
      subscribers,
      videoCount,
      avatarUrl,
      videos: videos.length > 0 ? videos : FALLBACK_CHANNEL_DATA.videos,
    });
  } catch (error) {
    return NextResponse.json(FALLBACK_CHANNEL_DATA);
  }
}
